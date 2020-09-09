import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "../../../node_modules/axios/dist/axios";
import Table from "../Table/Table";

const Form = () => {
  const [data, setData] = useState([]);
  const [Id, setId] = useState(null);

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

  const { handleSubmit, register, setValue, errors } = useForm();
  const onSubmit = (values, e) => {
    if (Id) {
      axios.put(`http://localhost:3000/List/${Id}`, values).then((response) => {
        console.log("berhasil update");
        const index = data.findIndex((item) => {
          return item.id === Id;
        });
        let newArray = [...data];
        newArray[index] = response.data;
        setData(newArray);
        setId(null);
      });
    } else {
      console.log("post");
      axios
        .post("http://localhost:3000/List", values)
        .then((response) => {
          setData([...data, response.data]);
        })
        .catch((error) => {
          console.log(error);
        });
    }
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

  const onUpdate = (id) => {
    axios.get(`http://localhost:3000/List/${id}`).then((response) => {
      setId(response.data.id);
      setValue("List", response.data.List);
      setValue("Activies", response.data.Activies);
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
            placeholder="day..."
            ref={register({ required: "Required" })}
          />
          {errors.list && errors.list.message}
          <br />
          <label htmlFor="list">Activies :</label>
          <input
            type="text"
            name="Activies"
            className="form-control"
            placeholder="Activies..."
            ref={register({ required: "Required" })}
          />
          <br />
          <button type="submit" className="btn btn-success">
            {Id ? "update" : "Create"}
          </button>
        </form>
      </div>
      <br />
      <Table todo={data} key={data.id} remove={onRemove} update={onUpdate} />
    </div>
  );
};

export default Form;
