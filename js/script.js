// form repeater
$(document).ready(function () {
  $(".repeater").repeater({
    initEmpty: false,
    defaultValues: {
      "text-input": "",
    },
    show: function () {
      $(this).slideDown();
    },
    hide: function (deleteElement) {
      // edit the code to make sure if the element is empty then proceeds to delete if not then ask user to reconfirm
      if (confirm("Are you sure you want to detele this section?")) {
        $(this).slideUp(deleteElement);
        setTimeout(() => {
          generateCV();
        }, 500);
      }
    },
    isFirstItemUndeletable: true,
  });
});
