import React, { Component } from "react";
import getFetchStats from "../../services/getFetchStats";
import db from "../../services/db.json";
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";

class TableStats extends Component {
  state = {
    array: [],
    arraySecond: []
  };

  componentDidMount() {
    // основной массив
    this.getStats();
    // страховочный массив, на случай если запрос не сработал
    this.setState({
      arraySecond: db.sort((a, b) => a.SortOrder - b.SortOrder)
    });
  }

  getStats = () =>
    getFetchStats()
      .then(data => data.json())
      .then(arr =>
        this.setState({
          array: [...arr.Rows.sort((a, b) => a.SortOrder - b.SortOrder)]
        })
      );

  render() {
    const { array, arraySecond } = this.state;
    return (
      <div>
        <ReactTable
          data={array.length > 0 ? array : arraySecond}
          columns={[
            {
              Header: "NAME",
              accessor: "ShortName",
              className: "sticky",
              headerClassName: "sticky",
              width: 300
            },
            {
              Header: "HIT/SHOTS",
              accessor: "Extra",
              width: 170
            },
            {
              Header: "SPEED",
              accessor: "Seconds",
              width: 170
            }
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
          filterable
        />
      </div>
    );
  }
}

export default TableStats;
