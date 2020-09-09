import React from "react";

const Table = (props) => {
  const { todo, remove, update } = props;

  const mapData = todo.map((data, index) => {
    return (
      <tr key={data.id}>
        <th scope="row">{index + 1}</th>
        <td>{data.Day}</td>
        <td>{data.Activies}</td>
        <td>
          <button className="btn btn-danger" onClick={() => remove(data.id)}>
            Delete
          </button>
          &nbsp;
          <button className="btn btn-primary" onClick={() => update(data.id)}>
            Update
          </button>
        </td>
      </tr>
    );
  });

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Day</th>
          <th scope="col">Activies</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>{mapData}</tbody>
    </table>
  );
};

export default Table;
