import AirTable from 'airtable'

const base = new AirTable({apiKey: 'keyyYbU1wpYVIeM8v'}).base('app8ZbcPx7dkpOnP0');

async function get_data(searchKey : string) {
  return new Promise((resolve) => {
    base('Students').select({
      maxRecords: 100,
      view: "Grid view",
      filterByFormula: "{Name} = '" + searchKey + "'", //"NOT({Name} = '')",
    }).eachPage(
      function page(records, fetchNextPage) {
          let students = records.map(function(record) {
              return {students : record.get('Name')}
          });
          resolve(students);
      }, 
      function done(err) {
        if (err) { console.error(err); return; 
      }
    });
  })
}

export const getClassesList = async (searchKey : string) => {
  try {
    const todos = await get_data(searchKey)
    return todos
  } catch (error) {
    // throw new Error(error)
  }
}