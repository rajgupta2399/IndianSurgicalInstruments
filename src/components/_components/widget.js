let WorkID;
let CategoryID;
let UserID;
let SubjectIDArray;
let interv;
let H;
let M;
let S;
let Showhour;
let Showminute;
let Showsecond;
let finallyFoundData = [];

let rubric_Redirect = "";

let navType;
let usrRecID;
let saveLockTime;
let SourceDateTime = [];
let PendingDateTime = [];
let taskid = [];
let finaliseArray = [];
let userMail = null;
let skippedTaskArray = [];
let User_ID_in_repo;

let alreadyAssignedTaskID;

let month = [
  "",
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

let taskURL;

let Accuracy_Rsn = [];
let Concept_Rsn = [];
let Explanation_Rsn = [];
let Structure_Rsn = [];
let Authoring_Rsn = [];

showLoader();

ZOHO.CREATOR.init().then(async function (data) {
  //Code goes here
  var initparams = await ZOHO.CREATOR.UTIL.getInitParams();
  userMail = initparams.loginUser;

  config = {
    appName: "task-app",
    reportName: "Frontend_User_Mgt_Report",
    criteria: `(Email == "${userMail}")`,
  };
  ZOHO.CREATOR.API.getAllRecords(config).then(function (response) {
    usrRecID = response.data[0].ID;
    navType = response.data[0].User_Access;
    getSkippedSubjects(1, response.data[0].User_ID);
  });
});

function getSkippedSubjects(page_Num, buildedUSERID) {
  config = {
    appName: "task-app",
    reportName: "Frontend_SME_QA_Skip_Report",
    criteria: `(Added_By == "${buildedUSERID}")`,
    page: page_Num,
    pageSize: 200,
  };
  ZOHO.CREATOR.API.getAllRecords(config)
    .then(function (response) {
      // console.log("For subject :",response.data);

      response.data.map((skipData) => {
        //============== work type =========== //
        skippedTaskArray.push(skipData);
      });
      //    console.log("subjectData :", subjectData);

      let num_of_records = response.data.length;
      if (num_of_records == 200) {
        getSkippedSubjects(parseInt(page_num) + 1, buildedUSERID);
      } else {
        // console.log("skippedTaskArray :",skippedTaskArray);
        // getCompletedSubjects(1, buildedUSERID);
        toExecute();
      }
    })
    .catch((err) => {
      //    console.log("No Maching Records");
      // console.log("error", err);
      toExecute();
      //    getCompletedSubjects(1, buildedUSERID);
    });
}

var assignedTask = Toastify({
  text: "Task Already claimed, please pick another task",
  duration: 3000,
  close: true,
  gravity: "top",
  position: "center",
  stopOnFocus: true,
  style: {
    background: "linear-gradient(to right, #ba6a2d, #ba6a2d)",
    padding: "8px 12px",
  },
});

var quitToast = Toastify({
  text: "Task Quit",
  // duration: 2000,
  close: true,
  gravity: "top",
  position: "center",
  stopOnFocus: true,
  style: {
    background: "linear-gradient(to right, #ba6a2d, #ba6a2d)",
    padding: "8px 12px",
  },
});

var complete = Toastify({
  text: "Task Completed",
  // duration: 2000,
  close: true,
  gravity: "top",
  position: "center",
  stopOnFocus: true,
  style: {
    background: "linear-gradient(to right, #ba6a2d, #ba6a2d)",
    padding: "8px 12px",
  },
});

var toast = Toastify({
  text: "Time Up",
  // duration: 2000,
  close: true,
  gravity: "top",
  position: "center",
  stopOnFocus: true,
  style: {
    background: "linear-gradient(to right, #ba6a2d, #ba6a2d)",
    padding: "8px 12px",
  },
});

var errtoast = Toastify({
  text: "Something Went Wrong",
  // duration: 2000,
  close: true,
  gravity: "top",
  position: "center",
  stopOnFocus: true,
  style: {
    background: "linear-gradient(to right, #ba6a2d, #ba6a2d)",
    padding: "8px 12px",
  },
});

var errtoast2 = Toastify({
  text: "Sorry! Task allocation has changed. Cannot submit task.",
  duration: 5000,
  close: true,
  gravity: "top",
  position: "center",
  stopOnFocus: true,
  style: {
    background: "linear-gradient(to right, #ba6a2d, #ba6a2d)",
    padding: "8px 12px",
  },
});

var taskDeleted = Toastify({
  text: "Task Deleted",
  duration: 5000,
  close: true,
  gravity: "top",
  position: "center",
  stopOnFocus: true,
  style: {
    background: "linear-gradient(to right, #ba6a2d, #ba6a2d)",
    padding: "8px 12px",
  },
});

// toast.showToast();
// errtoast.showToast();

function toExecute() {
  // console.log("to execute");
  ZOHO.CREATOR.init().then(async function (data) {
    var queryParams = await ZOHO.CREATOR.UTIL.getQueryParams();
    // console.log("Query Params :", queryParams);
    WorkID = queryParams.WorkType;
    CategoryID = queryParams.Category;
    UserID = queryParams.User;

    config = {
      appName: "task-app",
      reportName: "Frontend_User_Mgt_Report",
      criteria: `(Email == "${userMail}")`,
    };
    await ZOHO.CREATOR.API.getAllRecords(config).then(function (response) {
      saveLockTime = response.data[0].Task_Assigned_Frontend;
    });

    // console.log("savelockTime :", saveLockTime);
    // console.log(WorkID, CategoryID, UserID);
    if (
      WorkID !== undefined &&
      CategoryID !== undefined &&
      UserID !== undefined &&
      saveLockTime == "false"
    ) {
      // console.log("condition1");
      saveLockTime = "true";
      taskAllocationData(CategoryID, UserID);
    } else if (
      WorkID !== undefined &&
      CategoryID !== undefined &&
      UserID !== undefined &&
      saveLockTime == "true"
    ) {
      console.log("condition1");
      ZOHO.CREATOR.init().then(async function (data) {
        //Code goes here
        var initparams = await ZOHO.CREATOR.UTIL.getInitParams();
        userMail = initparams.loginUser;
        // console.log("userMail :",userMail)
        // console.log(initparams.loginUser);

        config = {
          appName: "task-app",
          reportName: "Frontend_User_Mgt_Report",
          criteria: `(Email == "${userMail}")`,
        };
        ZOHO.CREATOR.API.getAllRecords(config)
          .then(function (response) {
            // console.log("For userID :",response);
            let UserID = response.data[0].User_ID;
            usrRecID = response.data[0].ID;
            taskAssign = response.data[0].Task_Assigned_Frontend;
            if (taskAssign == "false") {
              hideLoader2();
            } else if (taskAssign == "true") {
              alreadyAssignedTaskID = response.data[0].Task_ID4.ID;
              let reqLockedTimeToPaas = response.data[0].Locked_Time;

              config002 = {
                appName: "task-app",
                reportName: "Frontend_Master_Task_Data2",
                criteria: `(ID == ${alreadyAssignedTaskID})`,
              };
              ZOHO.CREATOR.API.getAllRecords(config002)
                .then(function (response) {
                  // console.log("Task Api Data :",response);
                  finaliseArray.push(response.data[0]); //Locked_Date_Time
                  let alreadyLockedDateTime = response.data[0].Locked_Date_Time;
                  // console.log("alreadyLockedDateTime :",alreadyLockedDateTime);
                  // console.log("requested time :",reqLockedTimeToPaas,"finaliseArray", finaliseArray);

                  const now = new Date();
                  const options = {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: false,
                  };
                  const formattedDateTime = now.toLocaleString(
                    "en-US",
                    options
                  );
                  // console.log("formattedDateTime :",formattedDateTime);

                  let Date_got = formattedDateTime.split(",")[0];
                  let mon = Number.parseInt(Date_got.split("/")[0]);
                  let reqMonth = month[mon];
                  let reqDate = Number.parseInt(Date_got.split("/")[1]);
                  let reqYear = Number.parseInt(Date_got.split("/")[2]);

                  let time = formattedDateTime.split(",")[1];
                  time = time.trim();
                  // console.log("trimmed time :", time);

                  let an = `${reqDate}-${reqMonth}-${reqYear} ${time}`;
                  // console.log("an :",an);

                  let newUpdatedTime = calculateAndUpdateTimeDifference(
                    alreadyLockedDateTime,
                    an,
                    reqLockedTimeToPaas
                  );
                  // console.log("newUpdatedTime :",newUpdatedTime);
                  VisiblePage2(newUpdatedTime);
                  // console.log("inside api call subidarr :", subIDarr);
                })
                .catch((err) => {
                  console.log("Task Api error:", err);
                });
            }
            // console.log("userID :",UserID);
            if (response.code !== 3000) {
              hideLoader2();
            }
          })
          .catch((err) => {
            console.log("user_ID fetching error:", err);
            // errToast.showToast();
            hideLoader2();
          });
      });
      // hideLoader2();
    }

    if (WorkID == undefined && CategoryID == undefined && UserID == undefined) {
      ZOHO.CREATOR.init().then(async function (data) {
        //Code goes here
        var initparams = await ZOHO.CREATOR.UTIL.getInitParams();
        userMail = initparams.loginUser;
        // console.log("userMail :",userMail)
        // console.log(initparams.loginUser);

        config = {
          appName: "task-app",
          reportName: "Frontend_User_Mgt_Report",
          criteria: `(Email == "${userMail}")`,
        };
        ZOHO.CREATOR.API.getAllRecords(config)
          .then(function (response) {
            // console.log("For userID :",response);
            let UserID = response.data[0].User_ID;
            usrRecID = response.data[0].ID;
            taskAssign = response.data[0].Task_Assigned_Frontend;
            if (taskAssign == "false") {
              hideLoader2();
            } else if (taskAssign == "true") {
              alreadyAssignedTaskID = response.data[0].Task_ID4.ID;
              let reqLockedTimeToPaas = response.data[0].Locked_Time;

              config002 = {
                appName: "task-app",
                reportName: "Frontend_Master_Task_Data2",
                criteria: `(ID == ${alreadyAssignedTaskID})`,
              };
              ZOHO.CREATOR.API.getAllRecords(config002)
                .then(function (response) {
                  // console.log("Task Api Data :",response);
                  finaliseArray.push(response.data[0]); //Locked_Date_Time
                  let alreadyLockedDateTime = response.data[0].Locked_Date_Time;
                  // console.log("alreadyLockedDateTime :",alreadyLockedDateTime);
                  // console.log("requested time :",reqLockedTimeToPaas,"finaliseArray", finaliseArray);

                  const now = new Date();
                  const options = {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: false,
                  };
                  const formattedDateTime = now.toLocaleString(
                    "en-US",
                    options
                  );
                  // console.log("formattedDateTime :",formattedDateTime);

                  let Date_got = formattedDateTime.split(",")[0];
                  let mon = Number.parseInt(Date_got.split("/")[0]);
                  let reqMonth = month[mon];
                  let reqDate = Number.parseInt(Date_got.split("/")[1]);
                  let reqYear = Number.parseInt(Date_got.split("/")[2]);

                  let time = formattedDateTime.split(",")[1];
                  time = time.trim();
                  // console.log("trimmed time :", time);

                  let an = `${reqDate}-${reqMonth}-${reqYear} ${time}`;
                  // console.log("an :",an);

                  let newUpdatedTime = calculateAndUpdateTimeDifference(
                    alreadyLockedDateTime,
                    an,
                    reqLockedTimeToPaas
                  );
                  // console.log("newUpdatedTime :",newUpdatedTime);
                  VisiblePage2(newUpdatedTime);
                  // console.log("inside api call subidarr :", subIDarr);
                })
                .catch((err) => {
                  console.log("Task Api error:", err);
                });
            }
            // console.log("userID :",UserID);
            if (response.code !== 3000) {
              hideLoader2();
            }
          })
          .catch((err) => {
            console.log("user_ID fetching error:", err);
            // errToast.showToast();
            hideLoader2();
          });
      });
      // hideLoader2();
    }
  });
}

function taskAllocationData(catID, usrID) {
  config = {
    appName: "task-app",
    reportName: "Copy_of_User_Task_Allocation_Report",
    criteria: `(User_ID == ${usrID} && Category == ${catID})`,
    page: 1,
    pageSize: 200,
  };
  ZOHO.CREATOR.API.getAllRecords(config)
    .then(function (response) {
      // console.log("For subject :",response.data[0]);
      SubjectIDArray = response.data[0].Subject_field;
      // console.log("SubjectIDArray :",SubjectIDArray);
      // getAllSubjectData();
      taskRoutingData(1);
    })
    .catch((err) => {
      console.log(
        "Something Went wrong in fetching data from Task allocation report"
      );
      //    console.log("error", err);
    });
}

let taskRoutingMgtData = [];

//============ Get task routing logic ===============//
function taskRoutingData(page_Num) {
  var config = {
    appName: "task-app",
    reportName: "Task_Routing_Mgt1",
    criteria: `(Auditor_Email == "${userMail}")`,
    page: page_Num,
    pageSize: 200,
  };
  ZOHO.CREATOR.API.getAllRecords(config)
    .then(function (response) {
      response.data.map((obj) => {
        taskRoutingMgtData.push(obj.ID);
      });
      if (response.data.length == 200) {
        taskRoutingData(Number.parseInt(page_Num) + 1);
      } else {
        getAllSubjectData();
      }
    })
    .catch((err) => {
      console.log(err);
      getAllSubjectData();
    });
}

//============ Pending =============== //
async function getAllSubjectData() {
  try {
    await Promise.all(
      SubjectIDArray.map(async (subDATA) => {
        let SubjectID = subDATA.ID;
        let allSubData = [];

        async function subjectWant(page_Num) {
          try {
            let config = {
              appName: "task-app",
              reportName: "Frontend_Master_Task_Data2",
              criteria: `(Status == "Pending" && Category == ${CategoryID} && Work_Type == ${WorkID} && Auditor_Subject == ${SubjectID})`,
              page: page_Num,
              pageSize: 200,
            };

            let response = await ZOHO.CREATOR.API.getAllRecords(config);

            if (!response || !response.data) return;

            let filteredData = response.data.filter((item) => {
              // If Task_Routing_Mgt is not an array or is empty, keep the item (don't filter)
              if (
                !Array.isArray(item.Task_Routing_Mgt) ||
                item.Task_Routing_Mgt.length === 0
              ) {
                return true;
              }
              // If any ID in Task_Routing_Mgt exists in taskRoutingMgtData, filter it out
              return !item.Task_Routing_Mgt.some((task) =>
                taskRoutingMgtData.includes(task.ID)
              );
            });

            allSubData.push(...filteredData);

            // Recursively fetch next page if data length is 200
            if (response.data.length === 200) {
              await subjectWant(page_Num + 1);
            }
          } catch (error) {
            console.error("Error fetching records:", error);
          }
        }

        await subjectWant(1);

        let skippedTaskArrayID = skippedTaskArray.map((skp) => skp.Task_id);

        allSubData.forEach((item) => {
          if (!skippedTaskArrayID.includes(item.ID)) {
            finallyFoundData.push(item);
          }
        });
      })
    );

    console.log("before map", finallyFoundData);

    if (finallyFoundData.length === 0) {
      return hideLoader3();
    }

    finallyFoundData.forEach((data) => {
      if (data.Source_Date_Time !== "") {
        SourceDateTime.push(data);
      } else if (data.Pending_Date_Time !== "") {
        PendingDateTime.push(data);
      } else {
        taskid.push(data);
      }
    });

    // Sorting
    const sortedSourceDateTime = [...SourceDateTime].sort((a, b) => {
      const dateA = parseDateString(a.Source_Date_Time);
      const dateB = parseDateString(b.Source_Date_Time);
      return dateA - dateB || a.ID - b.ID;
    });

    const sortedPendingDateTime = [...PendingDateTime].sort((a, b) => {
      const dateA = parseDateString(a.Source_Date_Time);
      const dateB = parseDateString(b.Source_Date_Time);
      return dateA - dateB;
    });

    const sortedTaskId = [...taskid].sort(
      (a, b) => parseInt(a.ID) - parseInt(b.ID)
    );

    finaliseArray.push(
      ...sortedSourceDateTime,
      ...sortedPendingDateTime,
      ...sortedTaskId
    );

    console.log("finaliseArray :", finaliseArray);
    firstDataToshow(finaliseArray);
  } catch (error) {
    console.error("Error in getAllSubjectData:", error);
  }
}

//======= sorting Functions ==========//

function parseDateString(dateString) {
  return new Date(dateString);
}

async function firstDataToshow(arr) {
  const now = new Date();
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };
  const formattedDateTime = now.toLocaleString("en-US", options);
  // console.log("formattedDateTime :",formattedDateTime);

  let Date_got = formattedDateTime.split(",")[0];
  let mon = Number.parseInt(Date_got.split("/")[0]);
  let reqMonth = month[mon];
  let reqDate = Number.parseInt(Date_got.split("/")[1]);
  let reqYear = Number.parseInt(Date_got.split("/")[2]);

  let time = formattedDateTime.split(",")[1];
  time = time.trim();
  // console.log("trimmed time :", time);

  let dateAndTimeString = `${reqDate}-${reqMonth}-${reqYear} ${time}`;
  // console.log("dateAndTimeString :",dateAndTimeString);

  ZOHO.CREATOR.init().then(async function (data) {
    config = {
      appName: "task-app",
      reportName: "Frontend_User_Mgt_Report",
      id: usrRecID,
    };
    //get specific record API
    await ZOHO.CREATOR.API.getRecordById(config).then(function (response) {
      //callback block

      User_ID_in_repo = response.data.User_ID;
    });

    let formData = {
      Status: "Locked",
      Locked_By: `${User_ID_in_repo}`,
      Locked_Date_Time: `${dateAndTimeString}`,
    };
    var config = {
      appName: "task-app",
      reportName: "Frontend_Master_Task_Data2",
      id: `${arr[0].ID}`,
      data: {
        data: formData,
      },
    };
    await ZOHO.CREATOR.API.updateRecord(config)
      .then(function (response) {
        // console.log("Task locked api response :",response);
      })
      .catch((err) => {
        console.log("Something went wrong while locking the task :", err);
      });
  });

  var config = {
    appName: "task-app",
    reportName: "Frontend_Task_Mgt_Report",
    criteria: `(Category == ${arr[0].Category.ID} && Work_Type == ${arr[0].Work_Type.ID} && Subjects == ${arr[0].Auditor_Subject.ID})`,
  };
  await ZOHO.CREATOR.API.getAllRecords(config)
    .then(function (response) {
      // console.log(response.data[0]);
      // console.log("Data for operations :", response.data[0]);
      VisiblePage(response.data[0].Locked_Time);
    })
    .catch((e) => {
      console.log(e);
      // console.log("Something Went Wrong");
      // errtoast.showToast();
    });
}

function VisiblePage(reqDataforlockTime) {
  let timeToPass = addTimeToCurrentDate(reqDataforlockTime);
  // console.log("Date & Time in frontend user mgt repo :",timeToPass);

  if (saveLockTime == "true") {
    ZOHO.CREATOR.init().then(function () {
      let formData = {
        Task_Assigned_Frontend: "true",
        Locked_Time: `${reqDataforlockTime}`,
        Task_ID4: `${finaliseArray[0].ID}`,
        Timeout_Date_Time4: `${timeToPass}`,
      };
      config = {
        appName: "task-app",
        reportName: "Frontend_User_Mgt_Report",
        id: `${usrRecID}`,
        data: {
          data: formData,
        },
      };

      //update record API
      ZOHO.CREATOR.API.updateRecord(config).then(function (response) {
        // console.log("user mgt status updated");
      });
    });
  }

  document.getElementById("tskBtn").addEventListener("click", async () => {
    config = {
      appName: "task-app",
      reportName: "Frontend_User_Mgt_Report",
      id: usrRecID,
    };
    await ZOHO.CREATOR.API.getRecordById(config).then(function (response) {
      User_ID_in_repo = response.data.User_ID;
    });
    var config = {
      appName: "task-app",
      reportName: "Frontend_Master_Task_Data2",
      id: `${finaliseArray[0].ID}`,
    };
    ZOHO.CREATOR.API.getRecordById(config)
      .then(async function (response) {
        console.log(response);
        if (response.data.Locked_By == User_ID_in_repo) {
          window.open(`${finaliseArray[0].Task_URL.url}`, "_blank");
        } else {
          await ZOHO.CREATOR.init().then(async function (data) {
            let formData = {
              Task_Assigned_Frontend: "false",
              Locked_Time: "",
              Task_ID4: "",
              Timeout_Date_Time4: "",
            };
            config = {
              appName: "task-app",
              reportName: "Frontend_User_Mgt_Report",
              id: `${usrRecID}`,
              data: {
                data: formData,
              },
            };
            ZOHO.CREATOR.API.updateRecord(config).then(function (response) {
              // console.log("user mgt status updated");
              // location.reload();
            });
          });
          errtoast2.showToast();
          setTimeout(() => {
            redirectTaskPending();
          }, 3000);
        }
      })
      .catch((err) => {
        taskDeleted.showToast();
        setTimeout(() => {
          redirectTaskPending();
        }, 3000);
        console.log("Something went wrong while locking the task :", err);
      });
  });
  if (finaliseArray[0]["Rubric.Rubric"] == "No") {
    document.getElementById("mrkCom").style.display = "block";
    document.getElementById("mrkCom").addEventListener("click", async () => {
      document.getElementById("mark_com_noti").style.display = "flex";

      document.getElementById("tskBtn").disabled = "true";
      document.getElementById("tskBtn").style.backgroundColor =
        "rgb(182, 182, 182)";
      document.getElementById("tskBtn").style.color = "white";
      document.getElementById("skpBtn").disabled = "true";
      document.getElementById("skpBtn").style.backgroundColor =
        "rgb(182, 182, 182)";
      document.getElementById("skpBtn").style.color = "white";
      document.getElementById("mrkCom").disabled = "true";
      document.getElementById("mrkCom").style.backgroundColor = "#eee";
    });
  } else if (finaliseArray[0]["Rubric.Rubric"] == "Yes") {
    //Mark Rubric
    document.getElementById("mrkRbc").style.display = "block";
    document.getElementById("mrkRbc").addEventListener("click", async () => {
      config = {
        appName: "task-app",
        reportName: "Frontend_User_Mgt_Report",
        id: usrRecID,
      };
      //get specific record API
      await ZOHO.CREATOR.API.getRecordById(config).then(function (response) {
        User_ID_in_repo = response.data.User_ID;
      });

      // For vallidation before complete
      var config = {
        appName: "task-app",
        reportName: "Frontend_Master_Task_Data2",
        id: `${finaliseArray[0].ID}`,
      };

      ZOHO.CREATOR.API.getRecordById(config)
        .then(async function (response) {
          // console.log("Validation Data :- ",response.data);
          if (response.data.Locked_By == User_ID_in_repo) {
            // markRubricForm();
            if (rubric_Redirect == "SME_QA_CF") {
              markRubricForm();
            } else if (rubric_Redirect == "SME_QA_QC_Activities2") {
              markRubricPage();
            }
          } else {
            errtoast2.showToast();
            setTimeout(() => {
              location.reload();
            }, 3000);
          }
        })
        .catch((err) => {
          taskDeleted.showToast();
          setTimeout(() => {
            redirectTaskPending();
          }, 3000);
          console.log("Something went wrong while locking the task :", err);
        });
    });
  }

  let timeFound = reqDataforlockTime.split(":");

  H = Number.parseInt(timeFound[0]);
  M = Number.parseInt(timeFound[1]);
  S = Number.parseInt(timeFound[2]);

  rubric_Redirect = finaliseArray[0]["Rubric_Name.Rubric_Name"];
  document.getElementById("categoryCell").textContent =
    finaliseArray[0].Category.display_value;
  document.getElementById("worktypeCell").textContent =
    finaliseArray[0].Work_Type.display_value;
  document.getElementById("subjectCell").textContent =
    finaliseArray[0].Auditor_Subject.display_value;
  //subjectCell2
  document.getElementById("subjectCell2").textContent = finaliseArray[0].ID;
  // taskURL = response.data[0]
  hideLoader();
  run();
  interv = setInterval(run, 1000);
  setTimeout(checkStatus, 1000);
}

//  ========= another visible page when task is already assigned ==============//
function VisiblePage2(reqDataforlockTime) {
  document.getElementById("tskBtn").addEventListener("click", async () => {
    config = {
      appName: "task-app",
      reportName: "Frontend_User_Mgt_Report",
      id: usrRecID,
    };
    await ZOHO.CREATOR.API.getRecordById(config).then(function (response) {
      User_ID_in_repo = response.data.User_ID;
    });
    var config = {
      appName: "task-app",
      reportName: "Frontend_Master_Task_Data2",
      id: `${finaliseArray[0].ID}`,
    };
    ZOHO.CREATOR.API.getRecordById(config)
      .then(async function (response) {
        if (response.data.Locked_By == User_ID_in_repo) {
          window.open(`${finaliseArray[0].Task_URL.url}`, "_blank");
        } else {
          await ZOHO.CREATOR.init().then(async function (data) {
            let formData = {
              Task_Assigned_Frontend: "false",
              Locked_Time: "",
              Task_ID4: "",
              Timeout_Date_Time4: "",
            };
            config = {
              appName: "task-app",
              reportName: "Frontend_User_Mgt_Report",
              id: `${usrRecID}`,
              data: {
                data: formData,
              },
            };
            ZOHO.CREATOR.API.updateRecord(config).then(function (response) {
              // console.log("user mgt status updated");
              // location.reload();
            });
          });
          errtoast2.showToast();
          setTimeout(() => {
            redirectTaskPending();
          }, 3000);
        }
      })
      .catch((err) => {
        taskDeleted.showToast();
        setTimeout(() => {
          redirectTaskPending();
        }, 3000);
        console.log("Something went wrong while locking the task :", err);
      });
  });
  if (finaliseArray[0]["Rubric.Rubric"] == "No") {
    document.getElementById("mrkCom").style.display = "block";
    document.getElementById("mrkCom").addEventListener("click", async () => {
      document.getElementById("mark_com_noti").style.display = "flex";

      document.getElementById("tskBtn").disabled = "true";
      document.getElementById("tskBtn").style.backgroundColor =
        "rgb(182, 182, 182)";
      document.getElementById("tskBtn").style.color = "white";
      document.getElementById("skpBtn").disabled = "true";
      document.getElementById("skpBtn").style.backgroundColor =
        "rgb(182, 182, 182)";
      document.getElementById("skpBtn").style.color = "white";
      document.getElementById("mrkCom").disabled = "true";
      document.getElementById("mrkCom").style.backgroundColor = "#eee";
    });
  } else if (finaliseArray[0]["Rubric.Rubric"] == "Yes") {
    //Mark Rubric
    document.getElementById("mrkRbc").style.display = "block";
    document.getElementById("mrkRbc").addEventListener("click", async () => {
      config = {
        appName: "task-app",
        reportName: "Frontend_User_Mgt_Report",
        id: usrRecID,
      };
      //get specific record API
      await ZOHO.CREATOR.API.getRecordById(config).then(function (response) {
        //callback block
        // console.log(response);
        // console.log("Respose of use from Frontend_User_Mgt_Report :", response.data.User_ID);
        User_ID_in_repo = response.data.User_ID;
      });

      // For vallidation before complete
      var config = {
        appName: "task-app",
        reportName: "Frontend_Master_Task_Data2",
        id: `${finaliseArray[0].ID}`,
      };

      ZOHO.CREATOR.API.getRecordById(config)
        .then(async function (response) {
          // console.log("Validation Data :- ",response.data);
          if (response.data.Locked_By == User_ID_in_repo) {
            if (rubric_Redirect == "SME_QA_CF") {
              markRubricForm();
            } else if (rubric_Redirect == "SME_QA_QC_Activities2") {
              markRubricPage();
            }
          } else {
            errtoast2.showToast();
            setTimeout(() => {
              location.reload();
            }, 3000);
          }
        })
        .catch((err) => {
          taskDeleted.showToast();
          setTimeout(() => {
            redirectTaskPending();
          }, 3000);
          console.log("Something went wrong while mark rubric the task :", err);
        });
    });
  }

  let timeFound = reqDataforlockTime.split(":");

  H = Number.parseInt(timeFound[0]);
  M = Number.parseInt(timeFound[1]);
  S = Number.parseInt(timeFound[2]);

  rubric_Redirect = finaliseArray[0]["Rubric_Name.Rubric_Name"];
  document.getElementById("categoryCell").textContent =
    finaliseArray[0].Category.display_value;
  document.getElementById("worktypeCell").textContent =
    finaliseArray[0].Work_Type.display_value;
  document.getElementById("subjectCell").textContent =
    finaliseArray[0].Auditor_Subject.display_value;
  //subjectCell2
  document.getElementById("subjectCell2").textContent = finaliseArray[0].ID;
  // taskURL = response.data[0]
  hideLoader();
  run();
  interv = setInterval(run, 1000);
}

// ============================================================================================================== //

//====================== Timer function =====================//
const run = () => {
  if (M == 0 && H > 0) {
    H -= 1;
    M = 60;
  }
  if (S == 0 && M > 0) {
    M -= 1;
    S = 60;
  }
  if (H == 0 && M == 0 && S == 0) {
    //   alert("Time Finish");
    // toast.showToast();
    clearInterval(interv);

    ZOHO.CREATOR.init().then(async function (data) {
      const buttons = document.querySelectorAll("button");
      buttons.forEach((button) => {
        if (button.textContent != "OK") {
          button.style.backgroundColor = "rgb(182, 182, 182)";
          button.style.color = "white";
          button.disabled = true;
        }
      });

      let formData2 = {
        Task_Assigned_Frontend: "false",
        Locked_Time: "",
        Task_ID4: "",
        Timeout_Date_Time4: "",
      };
      let config2 = {
        appName: "task-app",
        reportName: "Frontend_User_Mgt_Report",
        id: `${usrRecID}`,
        data: {
          data: formData2,
        },
      };

      //update record API
      await ZOHO.CREATOR.API.updateRecord(config2).then(function (response) {
        // console.log("user mgt status updated");
      });

      let formData = {
        Status: "Pending",
        Locked_By: "",
        Locked_Date_Time: "",
      };
      var config = {
        appName: "task-app",
        reportName: "Frontend_Master_Task_Data2",
        id: `${finaliseArray[0].ID}`,
        data: {
          data: formData,
        },
      };
      await ZOHO.CREATOR.API.updateRecord(config)
        .then(function (response) {
          // console.log(response);
          // location.reload();
          document.getElementById("mainDiv").style.display = "none";
          document.getElementById("timeOutMsg").style.display = "flex";
          document
            .getElementById("timeOutBtn")
            .addEventListener("click", () => {
              redirectTaskPending();
            });
        })
        .catch((err) => {
          console.log("Something went wrong while locking the task :", err);
          redirectTaskPending();
        });
    });
  }
  if (S !== 0 || H !== 0 || M !== 0) {
    S = S - 1;
  }

  if (H < 10) {
    document.getElementById("hour").innerHTML = "0" + H;
    // console.log("0"+H);
  } else {
    document.getElementById("hour").innerHTML = H;
    // console.log(H);
  }
  if (M < 10) {
    document.getElementById("min").innerHTML = "0" + M;
    // console.log("0"+M);
  } else {
    document.getElementById("min").innerHTML = M;
    // console.log(M);
  }
  if (S < 10) {
    document.getElementById("sec").innerHTML = "0" + S;
    // console.log("0"+S);
  } else {
    document.getElementById("sec").innerHTML = S;
    // console.log(S);
  }
};

//==========================================================//

// Loader Functions
function showLoader() {
  let loaderCont = document.getElementById("loaderWrapper");
  loaderCont.style.display = "flex";
  loaderCont.classList.add("loaderWrapper");

  let mainContainer = document.getElementById("mainDiv");
  mainContainer.style.display = "none";
}

function hideLoader() {
  let loaderCont = document.getElementById("loaderWrapper");
  loaderCont.style.display = "none";

  let mainContainer = document.getElementById("mainDiv");
  mainContainer.style.display = "flex";
}

function hideLoader2() {
  let loaderCont = document.getElementById("loaderWrapper");
  loaderCont.style.display = "none";

  let mainContainer2 = document.getElementById("errContainer");
  mainContainer2.style.display = "flex";
} //noTask_left

function hideLoader3() {
  let loaderCont = document.getElementById("loaderWrapper");
  loaderCont.style.display = "none";

  let mainContainer2 = document.getElementById("noTask_left");
  mainContainer2.style.display = "flex";
}

// Mark Complete Yes
let markCompleteYes = document.getElementById("markCom_yes");
markCompleteYes.addEventListener("click", async () => {
  // console.log("UserID :", UserID);

  config = {
    appName: "task-app",
    reportName: "Frontend_User_Mgt_Report",
    id: usrRecID,
  };
  //get specific record API
  await ZOHO.CREATOR.API.getRecordById(config).then(function (response) {
    //callback block
    // console.log(response);
    // console.log("Respose of use from Frontend_User_Mgt_Report :", response.data.User_ID);
    User_ID_in_repo = response.data.User_ID;
  });

  // For vallidation before complete
  var config = {
    appName: "task-app",
    reportName: "Frontend_Master_Task_Data2",
    id: `${finaliseArray[0].ID}`,
  };

  ZOHO.CREATOR.API.getRecordById(config)
    .then(async function (response) {
      // console.log("Validation Data :- ",response.data);
      if (response.data.Locked_By == User_ID_in_repo) {
        const now = new Date();
        const options = {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        };

        const formattedDateTime = now.toLocaleString("en-US", options);
        // console.log("formattedDateTime :",formattedDateTime);

        let Date_got = formattedDateTime.split(",")[0];
        let mon = Number.parseInt(Date_got.split("/")[0]);
        let reqMonth = month[mon];
        let reqDate = Number.parseInt(Date_got.split("/")[1]);
        let reqYear = Number.parseInt(Date_got.split("/")[2]);

        let time = formattedDateTime.split(",")[1];
        time = time.trim();
        // console.log("trimmed time :", time);

        let dateAndTimeString = `${reqDate}-${reqMonth}-${reqYear} ${time}`;
        // console.log("dateAndTimeString :",dateAndTimeString);

        await ZOHO.CREATOR.init().then(async function (data) {
          const buttons = document.querySelectorAll("button");
          buttons.forEach((button) => {
            button.style.backgroundColor = "rgb(182, 182, 182)";
            button.style.color = "white";
            button.disabled = true;
          });
          let formData = {
            Status: "Completed",
            Completed_By: `${User_ID_in_repo}`,
            Completed_Date_Time: `${dateAndTimeString}`,
            User_ID: `${usrRecID}`,
            // "Locked_By":"",
            // "Locked_Date_Time":""
          };
          var config = {
            appName: "task-app",
            reportName: "Frontend_Master_Task_Data2",
            id: `${finaliseArray[0].ID}`,
            data: {
              data: formData,
            },
          };
          await ZOHO.CREATOR.API.updateRecord(config)
            .then(function (response) {
              // console.log(response);
              complete.showToast();
            })
            .catch((err) => {
              console.log("Something went wrong while locking the task :", err);
            });
        });

        // let reqFormData = {
        //     "User_ID":`${User_ID_in_repo}`,
        //     "Answer_UUID":`${finaliseArray[0].Answer_ID}`
        // }
        // config = {
        //     appName : "task-app",
        //     formName : "Frontend_HWH_Rubric",
        //     data : {
        //         data:reqFormData
        //     }
        // }
        // //add record API
        // ZOHO.CREATOR.API.addRecord(config).then(function(response){
        //     console.log(response);
        // });

        await ZOHO.CREATOR.init().then(async function (data) {
          let formData = {
            Task_Assigned_Frontend: "false",
            Locked_Time: "",
            Task_ID4: "",
            Timeout_Date_Time4: "",
          };
          config = {
            appName: "task-app",
            reportName: "Frontend_User_Mgt_Report",
            id: `${usrRecID}`,
            data: {
              data: formData,
            },
          };

          //update record API
          ZOHO.CREATOR.API.updateRecord(config).then(function (response) {
            // console.log("user mgt status updated");
            location.reload();
          });
        });
      } else {
        errtoast2.showToast();
        setTimeout(() => {
          // location.reload();
          redirectTaskPending();
        }, 3000);
      }
    })
    .catch((err) => {
      taskDeleted.showToast();
      setTimeout(() => {
        redirectTaskPending();
      }, 3000);
      console.log("Something went wrong while mark complete the task :", err);
    });
});

// ================ Skip Task ============ //
document.getElementById("skpBtn").addEventListener("click", async () => {
  // console.log("skipbutton clicked");
  config = {
    appName: "task-app",
    reportName: "Frontend_User_Mgt_Report",
    id: usrRecID,
  };
  //get specific record API
  await ZOHO.CREATOR.API.getRecordById(config).then(function (response) {
    //callback block
    // console.log(response);
    // console.log("Respose of use from Frontend_User_Mgt_Report :", response.data.User_ID);
    User_ID_in_repo = response.data.User_ID;
  });

  // For vallidation before complete
  var config = {
    appName: "task-app",
    reportName: "Frontend_Master_Task_Data2",
    id: `${finaliseArray[0].ID}`,
  };

  ZOHO.CREATOR.API.getRecordById(config)
    .then(async function (response) {
      // console.log("Validation Data :- ",response.data);
      if (response.data.Locked_By == User_ID_in_repo) {
        SkipForm();
      } else {
        await ZOHO.CREATOR.init().then(async function (data) {
          let formData = {
            Task_Assigned_Frontend: "false",
            Locked_Time: "",
            Task_ID4: "",
            Timeout_Date_Time4: "",
          };
          config = {
            appName: "task-app",
            reportName: "Frontend_User_Mgt_Report",
            id: `${usrRecID}`,
            data: {
              data: formData,
            },
          };

          //update record API
          ZOHO.CREATOR.API.updateRecord(config).then(function (response) {
            // console.log("user mgt status updated");
            // location.reload();
          });
        });
        errtoast2.showToast();
        setTimeout(() => {
          redirectTaskPending();
        }, 3000);
      }
    })
    .catch((err) => {
      taskDeleted.showToast();
      setTimeout(() => {
        redirectTaskPending();
      }, 3000);
      console.log("Something went wrong while locking the task :", err);
    });
});

// Mark Complete Cancel
let markCompleteCancel = document.getElementById("markCom_cancel");
markCompleteCancel.addEventListener("click", () => {
  document.getElementById("mark_com_noti").style.display = "none";

  document.getElementById("tskBtn").removeAttribute("disabled", "");
  document.getElementById("tskBtn").style.backgroundColor = "white";
  document.getElementById("tskBtn").style.color = "#F37D16";
  document.getElementById("skpBtn").removeAttribute("disabled", "");
  document.getElementById("skpBtn").style.backgroundColor = "white";
  document.getElementById("skpBtn").style.color = "#F37D16";
  document.getElementById("mrkCom").removeAttribute("disabled", "");
  document.getElementById("mrkCom").style.backgroundColor = "white";
  document.getElementById("quit").removeAttribute("disabled", "");
  document.getElementById("quit").style.backgroundColor = "white";
  document.getElementById("quit").style.color = "#F37D16";
});

function parseDateTime(dateTimeString) {
  // Parse a date time string into a Date object
  return new Date(dateTimeString);
}

function parseTimeString(timeString) {
  // Parse a time string in "HH:MM:SS" format into milliseconds
  const [hours, minutes, seconds] = timeString.split(":").map(Number);
  return (hours * 60 * 60 + minutes * 60 + seconds) * 1000;
}

function formatTimeString(milliseconds) {
  // Convert milliseconds to "HH:MM:SS" format
  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600)
    .toString()
    .padStart(2, "0");
  const minutes = Math.floor((totalSeconds % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (totalSeconds % 60).toString().padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
}

function calculateAndUpdateTimeDifference(
  dateTimeString1,
  dateTimeString2,
  givenTimeString
) {
  // Parse the date and time strings
  const date1 = parseDateTime(dateTimeString1);
  const date2 = parseDateTime(dateTimeString2);

  // Calculate the time difference in milliseconds
  const timeDifference = date2 - date1;
  // console.log("date1 and date2 timeDifference",timeDifference);
  // Parse the given time string into milliseconds
  const givenTimeMillis = parseTimeString(givenTimeString);
  // console.log("givenTimeString in ms :",givenTimeMillis);

  // Check if the time difference is less than the given time
  if (timeDifference < givenTimeMillis) {
    // Calculate the new time difference
    const newTimeDifference = givenTimeMillis - timeDifference;

    // Format the new time difference into "HH:MM:SS"
    const newTimeString = formatTimeString(newTimeDifference);

    return newTimeString;
  } else {
    return "00:00:00";
  }
}

function addTimeToCurrentDate(timeToAdd) {
  // Get the current date and time
  const currentDate = new Date();

  // Split the given time into hours, minutes, and seconds
  const [addHours, addMinutes, addSeconds] = timeToAdd.split(":").map(Number);

  // Add the given time to the current date
  currentDate.setHours(currentDate.getHours() + addHours);
  currentDate.setMinutes(currentDate.getMinutes() + addMinutes);
  currentDate.setSeconds(currentDate.getSeconds() + addSeconds);

  // Get date components
  const day = String(currentDate.getDate()).padStart(2, "0");
  const month = currentDate
    .toLocaleString("default", { month: "short" })
    .toUpperCase();
  const year = currentDate.getFullYear();

  // Get time components
  const hours = String(currentDate.getHours()).padStart(2, "0");
  const minutes = String(currentDate.getMinutes()).padStart(2, "0");
  const seconds = String(currentDate.getSeconds()).padStart(2, "0");

  // Format the date and time
  const formattedDate = `${day}-${month}-${year}`;
  const formattedTime = `${hours}:${minutes}:${seconds}`;

  return `${formattedDate} ${formattedTime}`;
}

// Next window to open //

// MrkRbc Button action
function markRubricForm() {
  ZOHO.CREATOR.init().then(function () {
    let urlReq;
    if (navType == "Portal") {
      urlReq = `https://taskapp.cheggindia.com/#Form:${rubric_Redirect}?Task_id=${finaliseArray[0].ID}&User_ID=${usrRecID}`;
    } else {
      // urlReq = `https://creatorapp.zoho.com/sdutta4/task-app/#Form:SME_Rubric1?Task_id=${finaliseArray[0].ID}&User_ID=${usrRecID}`
      urlReq = `#Form:${rubric_Redirect}?Task_id=${finaliseArray[0].ID}&User_ID=${usrRecID}`;
    }
    config = {
      action: "open",
      url: urlReq,
      window: "same",
    };
    ZOHO.CREATOR.UTIL.navigateParentURL(config);
  });
}

function markRubricPage() {
  ZOHO.CREATOR.init().then(function () {
    let urlReq;
    if (navType == "Portal") {
      urlReq = `https://taskapp.cheggindia.com/#Page:${rubric_Redirect}?Task_id=${finaliseArray[0].ID}&User_ID=${usrRecID}`;
    } else {
      // urlReq = `https://creatorapp.zoho.com/sdutta4/task-app/#Form:SME_Rubric1?Task_id=${finaliseArray[0].ID}&User_ID=${usrRecID}`
      urlReq = `#Page:${rubric_Redirect}?Task_id=${finaliseArray[0].ID}&User_ID=${usrRecID}`;
    }
    config = {
      action: "open",
      url: urlReq,
      window: "same",
    };
    ZOHO.CREATOR.UTIL.navigateParentURL(config);
  });
}

//SkipBtn Action
function SkipForm() {
  ZOHO.CREATOR.init().then(function () {
    let urlReq;
    if (navType == "Portal") {
      urlReq = `https://taskapp.cheggindia.com/#Form:SME_QA_Skip?Task_id=${finaliseArray[0].ID}`;
    } else {
      // urlReq = `https://creatorapp.zoho.com/sdutta4/task-app/#Form:Skip1?task_id=${finaliseArray[0].ID}`
      urlReq = `#Form:SME_QA_Skip?Task_id=${finaliseArray[0].ID}`; // development Link
    }
    config = {
      action: "open",
      url: urlReq,
      window: "same",
    };
    ZOHO.CREATOR.UTIL.navigateParentURL(config);
  });
}

// Again Redirect on Task pending page
function redirectTaskPending() {
  ZOHO.CREATOR.init().then(function () {
    let urlReq;
    if (navType == "Portal") {
      urlReq = `https://taskapp.cheggindia.com/#Page:Task_Pending`;
    } else {
      // urlReq = `https://creatorapp.zoho.com/sdutta4/task-app#Page:Task_Pending`
      urlReq = `#Page:Task_Pending`; // development Link
    }
    config = {
      action: "open",
      url: urlReq,
      window: "same",
    };
    ZOHO.CREATOR.UTIL.navigateParentURL(config);
  });
}

// ====================== Quit Button ========================== //

// Quit Btn
let quitBtn = document.getElementById("quit");
quitBtn.addEventListener("click", async () => {
  config = {
    appName: "task-app",
    reportName: "Frontend_User_Mgt_Report",
    id: usrRecID,
  };
  //get specific record API
  await ZOHO.CREATOR.API.getRecordById(config).then(function (response) {
    //callback block
    // console.log(response);
    // console.log("Respose of use from Frontend_User_Mgt_Report :", response.data.User_ID);
    User_ID_in_repo = response.data.User_ID;
  });

  // For vallidation before complete
  var config = {
    appName: "task-app",
    reportName: "Frontend_Master_Task_Data2",
    id: `${finaliseArray[0].ID}`,
  };

  ZOHO.CREATOR.API.getRecordById(config)
    .then(async function (response) {
      // console.log("Validation Data :- ",response.data);
      if (response.data.Locked_By == User_ID_in_repo) {
        const buttons = document.querySelectorAll("button");
        buttons.forEach((button) => {
          button.style.backgroundColor = "rgb(182, 182, 182)";
          button.style.color = "white";
          button.disabled = true;
        });

        await ZOHO.CREATOR.init().then(async function (data) {
          const buttons = document.querySelectorAll("button");
          buttons.forEach((button) => {
            button.style.backgroundColor = "rgb(182, 182, 182)";
            button.style.color = "white";
            button.disabled = true;
          });
          let formData = {
            Status: "Pending",
            Completed_By: "",
            Completed_Date_Time: "",
            Locked_By: "",
            Locked_Date_Time: "",
          };
          var config = {
            appName: "task-app",
            reportName: "Frontend_Master_Task_Data2",
            id: `${finaliseArray[0].ID}`,
            data: {
              data: formData,
            },
          };
          await ZOHO.CREATOR.API.updateRecord(config)
            .then(function (response) {
              // console.log(response);
              quitToast.showToast();
            })
            .catch((err) => {
              console.log("Something went wrong while locking the task :", err);
            });
        });

        const now = new Date();
        const options = {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        };

        const formattedDateTime = now.toLocaleString("en-US", options);
        // console.log("formattedDateTime :",formattedDateTime);

        let Date_got = formattedDateTime.split(",")[0];
        let mon = Number.parseInt(Date_got.split("/")[0]);
        let reqMonth = month[mon];
        let reqDate = Number.parseInt(Date_got.split("/")[1]);
        let reqYear = Number.parseInt(Date_got.split("/")[2]);

        let time = formattedDateTime.split(",")[1];
        time = time.trim();

        let dateAndTimeString = `${reqDate}-${reqMonth}-${reqYear} ${time}`;

        let formDataQuit = {
          Task_ID: `${finaliseArray[0].ID}`,
          Category: `${finaliseArray[0].Category.display_value}`,
          Work_Type: `${finaliseArray[0].Work_Type.display_value}`,
          Subject_field: `${finaliseArray[0].Auditor_Subject.display_value}`,
          Quit_By: `${User_ID_in_repo}`,
          Quit_Date_Time: `${dateAndTimeString}`,
          User_Mgt1: `${usrRecID}`,
        };
        config = {
          appName: "task-app",
          formName: "SME_QA_Quit_Tasks",
          data: {
            data: formDataQuit,
          },
        };

        //Add record API
        await ZOHO.CREATOR.API.addRecord(config).then(function (response) {
          console.log("Quite Data Added");
        });

        await ZOHO.CREATOR.init().then(async function (data) {
          let formData = {
            Task_Assigned_Frontend: "false",
            Locked_Time: "",
            Task_ID4: "",
            Timeout_Date_Time4: "",
          };
          config = {
            appName: "task-app",
            reportName: "Frontend_User_Mgt_Report",
            id: `${usrRecID}`,
            data: {
              data: formData,
            },
          };

          //update record API
          await ZOHO.CREATOR.API.updateRecord(config).then(function (response) {
            // console.log("user mgt status updated");
            redirectTaskPending();
          });
        });
      } else {
        await ZOHO.CREATOR.init().then(async function (data) {
          let formData = {
            Task_Assigned_Frontend: "false",
            Locked_Time: "",
            Task_ID4: "",
            Timeout_Date_Time4: "",
          };
          config = {
            appName: "task-app",
            reportName: "Frontend_User_Mgt_Report",
            id: `${usrRecID}`,
            data: {
              data: formData,
            },
          };

          //update record API
          await ZOHO.CREATOR.API.updateRecord(config).then(function (response) {
            // console.log("user mgt status updated");
            // redirectTaskPending();
          });
        });
        errtoast2.showToast();
        setTimeout(() => {
          // location.reload();
          redirectTaskPending();
        }, 3000);
      }
    })
    .catch((err) => {
      taskDeleted.showToast();
      setTimeout(() => {
        redirectTaskPending();
      }, 3000);
      console.log("Something went wrong while quit the task :", err);
    });
});

// ============================================================ //

// Font Family //
document.body.style.fontFamily = '"Lato", sans-serif';

function clickableText() {
  redirectTaskPending();
}

async function checkStatus() {
  var config = {
    appName: "task-app",
    reportName: "Frontend_Master_Task_Data2",
    criteria: `(ID == ${finaliseArray[0].ID})`,
  };

  await ZOHO.CREATOR.API.getAllRecords(config)
    .then(async function (response) {
      //    console.log("Check Status response :", response.data);
      //    console.log("user_ID :",User_ID_in_repo);
      if (response.data[0].Locked_By == User_ID_in_repo) {
        console.log("System check-up");
      } else {
        assignedTask.showToast();
        let formData = {
          Task_Assigned_Frontend: "false",
          Locked_Time: "",
          Task_ID4: "",
          Timeout_Date_Time4: "",
        };
        config = {
          appName: "task-app",
          reportName: "Frontend_User_Mgt_Report",
          id: `${usrRecID}`,
          data: {
            data: formData,
          },
        };
        await ZOHO.CREATOR.API.updateRecord(config).then(function (response) {
          setTimeout(redirectTaskPending, 3000);
        });
      }
    })
    .catch((err) => {
      console.log("check Status err :", err);
      // assignedTask.showToast();
      // setTimeout(redirectTaskPending, 3000);
    });
}
