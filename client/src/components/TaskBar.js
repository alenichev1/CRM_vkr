import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Context } from "..";
import ListGroup from "react-bootstrap/ListGroup";

const TaskBar = observer(() => {
  const { application } = useContext(Context);
  return (
    <ListGroup>
      {application.task.map((task) => (
        <ListGroup.Item
          style={{
            cursor: "pointer",
            backgroundColor: "grey",
            color: "white",
          }}
          active={task.id === application.selectedTask.id}
          onClick={() => application.setSelectedTask(task)}
          key={task.id}
        >
          {task.name}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
});

export default TaskBar;
