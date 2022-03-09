import React from "react";
import "./App.css";
import Activity from "./Components/Activity";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activities: JSON.parse(window.localStorage.getItem("activity-tracker")),
    };
  }

  componentDidMount(){
    if(window.localStorage === "undefined"){
      window.localStorage.setItem("activity-tracker", []);
    }
      // this.setState({
      //   activities: JSON.parse(window.localStorage.getItem("activity-tracker"))
      // })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let activityName = e.target.name.value;
    e.target.name.value = "";
    if (activityName) {
      let allActivities = JSON.parse(
        window.localStorage.getItem("activity-tracker")
      );
      allActivities =
        allActivities === null
          ? JSON.stringify([{ name: activityName, days: this.isDoneArray() }])
          : JSON.stringify([
              ...allActivities,
              {
                name: activityName,
                days: this.isDoneArray(),
              },
            ]);
      this.setState({
        activities: JSON.parse(allActivities),
      });
      window.localStorage.setItem("activity-tracker", allActivities);
    } else {
      alert("Activity cannot be empty");
    }
  };

  handleCompleted = (e) => {
    const activityName =
      e.target.parentElement.parentElement.parentElement.dataset.activityId;
    const day = parseInt(e.target.value) - 1;
    let allActivities = JSON.parse(
      window.localStorage.getItem("activity-tracker")
    );
    let index = allActivities.findIndex(
      (activity) => activity.name === activityName
    );
    allActivities[index].days[day].isDone =
      !allActivities[index].days[day].isDone;
    this.setState({
      activities: allActivities,
    });
    window.localStorage.setItem(
      "activity-tracker",
      JSON.stringify(allActivities)
    );
  };

  handleDeleteActivity = (e) => {
    const activityName = e.target.parentElement.dataset.activityId;
    let allActivities = JSON.parse(
      window.localStorage.getItem("activity-tracker")
    );
    let index = allActivities.findIndex(
      (activity) => activity.name === activityName
    );
    allActivities.splice(index, 1);
    this.setState({
      activities: allActivities,
    });
    window.localStorage.setItem(
      "activity-tracker",
      JSON.stringify(allActivities)
    );
  };

  isDoneArray = () => {
    let date = new Date();
    let numOfDays = {
      1: 31,
      2: 28,
      3: 31,
      4: 30,
      5: 31,
      6: 30,
      7: 31,
      8: 31,
      9: 30,
      10: 31,
      11: 30,
      12: 31,
    };
    let isDoneArray = [];
    for (let i = 1; i <= numOfDays[date.getMonth() + 1]; i++) {
      isDoneArray.push({
        id: i,
        isDone: false,
      });
    }
    return isDoneArray;
  };

  render() {
    return (
      <div className="App container m-t">
        <h1 className="main-heading">Monthly Activity tracker</h1>
        <form className="flex align-ct justify-ct" onSubmit={this.handleSubmit}>
          <input
            type="text"
            className="input-name"
            name="name"
            placeholder="ex. coding"
          />
          <button className="submit-btn" type="submit">
            Add Activity
          </button>
        </form>
        <Activity
          completed={this.handleCompleted}
          deleteActivity={this.handleDeleteActivity}
          allActivities={this.state.activities}
        />
      </div>
    );
  }
}

export default App;
