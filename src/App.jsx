import React from "react";
import MainLayout from "./componets/MainLayout";
import TaskMain from "./componets/TaskMain"

function App() {
  return (
    <div>
      <MainLayout>
        <TaskMain/>
      </MainLayout>
    </div>
  );
}

export default App;
