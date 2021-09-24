import AirTable from 'airtable'
import { IClass } from './store/reducers';

type StringToString = {
  [key: string]: string;
};

const base = new AirTable({ apiKey: 'keyhiv1VYCcezivES' }).base('app8ZbcPx7dkpOnP0');

async function getFilteredData(table:string, pattern: string) {
  return new Promise((resolve) => {
    base(table).select({
      view: 'Grid view',
      filterByFormula: pattern
    }).firstPage(function (err: string, recs) {
      if (err) { console.error(err); return; }
      resolve(recs)
    })
  })
}

const getData = async (search : string) => {
  let result: [IClass];
  let studentIdToName: StringToString = {};
  let pattern = "{Name} = '" + search + "'";
  const classIDs: any = await getFilteredData('Students', pattern);

  let classSearchPattern: string = '';
  classIDs.map((cc: any) => {
    cc.fields.Classes.map((c : string) => {
      classSearchPattern += `RECORD_ID() = '${c}',`;
    })
  })
  classSearchPattern = classSearchPattern.slice(0, -1);
  classSearchPattern = "OR(" + classSearchPattern + ")";

  const classRecords: any = await getFilteredData('Classes',  classSearchPattern);

  classRecords.map((c: any) => {
    c.fields.Students.map((s: string) => {
      if (studentIdToName[s] === undefined) {
        studentIdToName[s] = '';
      }
    })
  })

  let studentSearchPattern: string = '';
  for (let i in studentIdToName) {
    studentSearchPattern += `RECORD_ID() = '${i}',`;
  }
  studentSearchPattern = studentSearchPattern.slice(0, -1);
  studentSearchPattern = "OR(" + studentSearchPattern + ")";

  const studentRecords: any = await getFilteredData('Students', studentSearchPattern);
  studentRecords.map((s: any) => {
    studentIdToName[s.id] = s.fields.Name;
  })

  result = classRecords.map((c: any) => {
    const name: string = c.fields.Name;
    const students: [string] = c.fields.Students.map((s: any) => {
      return studentIdToName[s];
    })

    const res: IClass = { name: name, students: students };
    return res;
  })

  return result;
}


export const getClassesList = async (search: string) => {
  try {
    const todos = await getData(search)
    return todos
  } catch (error) {
    // throw new Error(error)
  }
}