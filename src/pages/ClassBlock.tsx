import * as React from "react";

interface IClass {
  name: string
  students: string[]
}

type Props = {
  _class: IClass;
};

export const ClassBlock: React.FC<Props> = ({ _class }) => {
  return (
    <div className="Clas">
      <div>
        <strong>Name</strong>
        <p>{_class.name}</p>
      </div>
      <div>
        <strong>Students</strong>
        <div>
          {
            _class.students.map((student: string) => (
              <p>{student}</p>
            ))
          }
        </div>
      </div>
    </div>
  );
};
