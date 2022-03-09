import "../App.css";

function Activity(props) {
  function getMonthInText() {
    const date = new Date();
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return monthNames[date.getMonth()];
  }

  function progressRate(activity) {
    let progress = (
      (activity.days.reduce((acc, day) => {
        console.log(acc, day);
        if (day.isDone) acc = acc + 1;
        return acc;
      }, 0) /
        activity.days.length) *
      100
    ).toFixed(2);
    let category =
      progress < 30
        ? "red"
        : progress > 30 && progress < 70
        ? "amber"
        : "green";
    return { progress, category };
  }

  return (
    <>
      <div className="all-activities">
        {props.allActivities.map((activity) => {
          return (
            <div
              key={activity.name + Math.floor(Math.random() * 100)}
              data-activity-id={activity.name}
              className="activity-item flex justify-sb"
            >
              <div className="col-1-2 flex justify-ct align-ct flex-23 col">
                <h3 className="name">{activity.name}</h3>
                <p className="month">{getMonthInText()}</p>
              </div>
              <div className="col-2-2 flex flex-73 wrap col">
                <div className="days">                  
                  {activity.days.map((day) => {
                    return (
                      <button
                        value={day.id}
                        onClick={props.completed}
                        className={day.isDone ? "completed day-btn" : "day-btn"}
                        key={day.id}
                      >
                        {day.id}
                      </button>
                    );
                  })}
                </div>
                <div className="progress">
                  <p className="progress-rate">
                    Activity Progress: 
                    <span className={progressRate(activity).category}>
                      {progressRate(activity).progress} %{" "}
                    </span>
                  </p>
                </div>
              </div>
              <span
                className="close-btn flex justify-ct align-ct"
                onClick={props.deleteActivity}
              >
                X
              </span>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Activity;
