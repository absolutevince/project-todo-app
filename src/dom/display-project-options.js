import ParentDirectory from "../modules/Parent-directory";
import pubsub from "../modules/pubsub";

export default (function displayProjectOptions() {
  const select = document.querySelector("#project-select");

  function displayOptions() {
    select.innerHTML = "";
    ParentDirectory.getProjects().forEach((proj) => {
      const option = document.createElement("option");
      option.textContent = proj.name;
      option.value = proj.id;
      select.appendChild(option);
    });
  }

  function setSelectValue() {
    [...select.children].forEach((option) => {
      if (option.value === ParentDirectory.getActiveProject().id) {
        option.setAttribute("selected", true);
      }
    });
  }

  select.addEventListener("change", (e) => {
    pubsub.publish("activate_project", e.target.value);
  });

  return {
    init: () => {
      // initializations
      pubsub.sub("create_project", displayOptions);
      pubsub.sub("create_project", setSelectValue);

      displayOptions();
      setSelectValue();
    },
  };
})();
