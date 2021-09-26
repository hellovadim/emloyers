import { Component } from "react";

import "./app.css";

import AppInfo from "../app-info/app-info";
import SearchPanel from "../search-panel/search-panel";
import AppFilter from "../app-filter/app-filter";
import EmployersList from "../employers-list/employers-list";
import EmployersAddForm from "../employers-add-form/employers-add-form";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        { id: "1", name: "John", salary: 3000, increase: false, rise: false },
        { id: "2", name: "Carl", salary: 2000, increase: false, rise: false },
        { id: "3", name: "Alex", salary: 5000, increase: false, rise: false },
      ],
      term: "",
      filter: "all",
    };
    this.maxId = 4;
  }

  deleteItem = (id) => {
    this.setState(({ data }) => {
      return {
        data: data.filter((item) => item.id !== id),
      };
    });
  };

  addItem = (name, salary) => {
    const newItem = {
      name,
      salary,
      increase: false,
      id: this.maxId++,
      rise: false,
    };
    this.setState(({ data }) => {
      const newArr = [...data, newItem];
      return {
        data: newArr,
      };
    });
  };
  // onToggleIncrease = (id) => {
  //   this.setState(({ data }) => ({
  //     data: data.map((item) => {
  //       if (item.id === id) {
  //         return { ...item, increase: !item.increase };
  //       }
  //       return item;
  //     }),
  //   }));
  // };
  // onToggleRise = (id) => {
  //   this.setState(({ data }) => ({
  //     data: data.map((item) => {
  //       if (item.id === id) {
  //         return { ...item, rise: !item.rise };
  //       }
  //       return item;
  //     }),
  //   }));
  // };
  onToggleProp = (id, prop) => {
    this.setState(({ data }) => ({
      data: data.map((item) => {
        if (item.id === id) {
          return { ...item, [prop]: !item[prop] };
        }
        return item;
      }),
    }));
  };
  searchEmp = (items, term) => {
    if (term.length === 0) {
      return items;
    }

    return items.filter((item) => {
      return item.name.indexOf(term) > -1;
    });
  };
  onUpdateSearch = (term) => {
    this.setState({
      term,
    });
  };
  filterPost = (items, filter) => {
    switch (filter) {
      case "rise":
        return items.filter((item) => item.rise);
      case "moreThen1000$":
        return items.filter((item) => item.salary > 1000);
      default:
        return items;
    }
  };
  onFilterSelect = (filter) => {
      this.setState({filter})
  }

  render() {
    const employers = this.state.data.length;
    const increased = this.state.data.filter((item) => item.increase).length;
    const { data, term, filter } = this.state;
    const visibleData = this.filterPost(this.searchEmp(data, term), filter);

    return (
      <div className="app">
        <AppInfo employers={employers} increased={increased} />
        <div className="search-panel">
          <SearchPanel onUpdateSearch={this.onUpdateSearch} />
          <AppFilter filter={filter} onFilterSelect={this.onFilterSelect} />
        </div>
        {visibleData.length === 0 ? (
          <h1 style={{textAlign: 'center'}}>Нет ни одного сотрудника</h1>
        ) : (
          <EmployersList
            data={visibleData}
            onDelete={this.deleteItem}
            onToggleProp={this.onToggleProp}
          />
        )}
        <EmployersAddForm onAdd={this.addItem} />
      </div>
    );
  }
}

export default App;
