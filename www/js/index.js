(function($) {
  var shoppingList = null;
  var $shoppingList = null;

  function initStorage() {
    var shoppingList = localStorage.getItem("shoppingList");
    if (!shoppingList) {
      localStorage.setItem("shoppingList", JSON.stringify([]));
      return [];
    }

    return JSON.parse(shoppingList);
  }

  function persistStorage() {
    localStorage.setItem("shoppingList", JSON.stringify(shoppingList));
  }

  function appendItem(item) {
    $shoppingList.append(
      '<li>' +
      '<a href="#">' + item + '</a>' +
      '<a title="Delete" href="#" class="delete ui-btn ui-btn-icon-notext ui-icon-delete"></a>' +
      '</li>').listview("refresh");
  }

  function bindList() {
    shoppingList.forEach(function(item) {
      appendItem(item);
    });
  }

  function addItem() {
    var $newItem = $("#newItem");
    var newItem = $newItem.val();
    if (!newItem) return;
    shoppingList.push(newItem);
    persistStorage();
    appendItem(newItem);
    attachEvents();
    $newItem.val("");
  }

  function attachEvents() {
    $('.delete').off('click');
    $('.delete').on('click', deleteItem);
  }

  function deleteItem() {
    var $this = $(this);
    var itemToDel = $this.prev().text();
    shoppingList = shoppingList.filter(function(item) {
      return itemToDel != item;
    });

    persistStorage();
    $this.parent().remove();
  }

  $(document).on("ready", function(){
    shoppingList = initStorage();
    $shoppingList = $("#shoppingList");
    bindList();
    attachEvents();
    $('#addItem').on('click', addItem);
  });
})(jQuery);
