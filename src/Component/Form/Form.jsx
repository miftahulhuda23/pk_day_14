import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "../../../node_modules/axios/dist/axios";
import Table from "../Table/Table";

const Form = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const getData = () => {
      axios
        .get("http://localhost:3000/List")
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getData();
  }, []);

  const { handleSubmit, register, errors } = useForm();
  const onSubmit = (values, e) => {
    axios
      .post("http://localhost:3000/List", values)
      .then((response) => {
        // alert("data berhasil masuk");
        setData([...data, response.data]);
      })
      .catch((error) => {
        alert(error);
      });
    e.target.reset();
  };

  const onRemove = (id) => {
    axios
      .delete(`http://localhost:3000/List/${id}`)
      .then((response) => {
        const newData = data.filter((item) => {
          if (item.id === id) return false;
          return true;
        });
        setData(newData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container">
      <div className="form-group">
        <br />
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="list">Day :</label>
          <input
            type="text"
            name="Day"
            className="form-control"
            placeholder="day"
            ref={register({ required: "Required" })}
          />
          {errors.list && errors.list.message}
          <br />
          <label htmlFor="list">Activies :</label>
          <input
            type="text"
            name="Activies"
            className="form-control"
            placeholder="Activies"
            ref={register({ required: "Required" })}
          />
          <br />
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </form>
      </div>
      <br />
      <Table todo={data} key={data.id} remove={onRemove} />
    </div>
  );
};

export default Form;
