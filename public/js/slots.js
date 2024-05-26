let floorName = ''
let wingName = ''
let slotName = ''
let isSlotAvailable = false
let category = ''
let capacity = ''
let isFullyOccupied = false
let isActive = false
let showDvOldFW = false
let ddlFloor = ''
let ddlWing = ''
let backendURL = 'http://localhost:3000/PMS/v1/slots'
let selectedFloor = ''
let selectedWing = ''
let newSlotHTML = ''
let newSlotObj = {}
let newSlots = []
var allData = []
var jsonData ={}
let sigleSlot =[]
$(document).ready(function () {
  floorName = $('#txtFloorName')
  wingName = $('#txtWingName')
  slotName = $('#txtSlot')
  isSlotAvailable = $('#chkSlot')
  category = $('#chkCategory')
  capacity = $('#txtCapacity')
  isFullyOccupied = $('#chkOccupied')
  isActive = $('#chkActive')
  showDvOldFW = $('#showDvOldFW')
  ddlFloor = $('#chkFloor')
  ddlWing = $('#chkWing')

  $('#dvOldFW').hide()
  ddlWing.attr('disabled', 'disabled')
  isSlotAvailable.attr('checked', true)
  isActive.attr('checked', true)

  getAPI(backendURL).then(floors => {
    allData = floors;
    var totalCapacity =0
    var allDataHTML = ''
    var allDataLength = allData.data.length
    for (var i=0; i< allDataLength; i++){
      for (var j=0; j< allData.data[i].slots.length; j++) {
        allDataHTML +=
        '<tr>' +
        '<td>' + allData.data[i].floorName + '</td>' +
        '<td>' + allData.data[i].wingName + '</td>' +
        '<td>' + allData.data[i].slots[j].slotName + '</td>' +
        '<td>' + allData.data[i].slots[j].isAvailable+ '</td>' +
        '<td>' + allData.data[i].slots[j].vehicleType + '</td>' +
        '<td>' + allData.data[i].slots[j].capacity + '</td>' +
        '<td>' + allData.data[i].isFullyOccupied + '</td>' +
        '<td>' + allData.data[i].isActive + '</td>' +
        '<td data-toggle="modal" data-target="#editModal" onclick=\'editSlot("' + allData.data[i].slots[j]._id
        + '")\'>'+
        "<i class='fa fa-pencil'></i>"+'</td>' +
        '<td onclick=\'removeFromSlots("' + allData.data[i]._id +'","' +
        allData.data[i].slots[j]._id + '")\'>' +
         "<i class = 'fa fa-trash'></i>" + '</td>' +
        '</tr>'
        totalCapacity += allData.data[i].slots[j].capacity  
        }
        }
      $('#tAllData').html(allDataHTML)  

    console.log(allData)
  })
  .catch(error => {
    console.log(error)
  })

  showDvOldFW.click(function () {
    if (showDvOldFW.is(':checked') === true) {
      $('#dvOldFW').show()
      $('#dvNewFW').hide()
      newSlots = []
      $("#tAvailableSlots").html('')
    } else {
      $('#dvOldFW').hide()
      $('#dvNewFW').show()
      newSlots = []
      $("#tAvailableSlots").html('')
    }
  })

  getAPI(backendURL.concat(`/${true}/floors`))
    .then((floors) => {
      console.log(floors)
      var distinctFloors = floors
      if (distinctFloors.success) {
        $.each(distinctFloors.data, function (index, floor) {
          ddlFloor.append(
            '<option value="' + floor + '">' + floor + '</option>',
          )
        })
      } else {
        console.log('Something Went Wrong')
      }
    })
    .catch((error) => {
      console.log(error)
    })

  ddlFloor.change(function () {
    $('#chkWing option').remove()
    ddlWing.append('<option value="<-- select -->"><-- select --></option>')
    selectedFloor = this.value
    if (selectedFloor !== '< --select -->') {
      ddlWing.attr('disabled', false)
      getAPI(backendURL.concat(`/${selectedFloor}/wings`))
        .then((wings) => {
          var distinctWings = wings
          if (distinctWings.success) {
            $.each(distinctWings.data, function (index, wing) {
              ddlWing.append(
                '<option value="' + wing + '">' + wing + '</option>',
              )
            })
          } else {
            console.log('Something went wrong')
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }
  })

  ddlWing.change(function () {
    var slotsHTML = ''
    var slotsLength = 0
    var oldSlots = []
    selectedWing = this.value
    if (selectedWing !== '<-- select -->') {
      getAPI(backendURL.concat(`/${selectedFloor}/${selectedWing}`)).then(
        (allSlots) => {
          oldSlots = allSlots.data[0].slots
          slotsLength = oldSlots.length
          if (slotsLength !== 0) {
            for (var i = 0; i < slotsLength; i++) {
              slotsHTML +=
                '<tr>' +
                '<td>' +
                oldSlots[i].slotName +
                '</td>' +
                '<td>' +
                oldSlots[i].isAvailable +
                '</td>' +
                '<td>' +
                oldSlots[i].vehicleType +
                '</td>' +
                '<td>' +
                oldSlots[i].capacity +
                '</td>' +
                '<td onclick="removeFromSlots(\'' +
                oldSlots[i]._id +
                '\')">' +
                '<i class="fa fa-trash"></i>' +
                '</td>' +
                '</tr>'
            }
            $('#tAvailableSlots').html(slotsHTML)
          } else {
            slotsHTML = ''
            $('#tAvailableSlots').html()
            slotsHTML = 'No Slots are available for the selected floor and wing'
            $('#tAvailableSlots').html(slotsHTML)
          }
        },
      )
    }
  })

  $('#btnAddSlot').click(function () {
    if (addValidation()) {
      slotName = $('#txtSlot').val()
      category = $('#chkCategory').val()
      capacity = $('#txtCapacity').val()
      isSlotAvailable = $('#chkSlot').is(':checked') === false ? false : true
      newSlotObj = {
        slotName: slotName,
        isAvailable: isSlotAvailable,
        vehicleType: category,
        capacity: capacity,
      }
      newSlots.push(newSlotObj)
      for (var i = 0; i < newSlots.length; i++) {
        newSlotHTML =
          '<tr>' +
          '<td>' +
          newSlots[i].slotName +
          '</td>' +
          '<td>' +
          newSlots[i].isAvailable +
          '</td>' +
          '<td>' +
          newSlots[i].vehicleType +
          '</td>' +
          '<td>' +
          newSlots[i].capacity +
          '</td>' +
          '<td onclick="removeRow(\'' +
          i +
          '\')">' +
          '<i class="fa fa-trash"></i>' +
          '</td>' +
          '</tr>'
      }
      $('#tAvailableSlots').append(newSlotHTML)
      $('#txtSlot').val('')
      $('#chkCategory').val('<-- select -->')
      $('#txtCapacity').val('')
    }
  })

  $('#btnSave').click(function () {
    floorName = $('#txtFloorName')
    wingName = $('#txtWingName')
    slotName = $('#txtSlot')
    isSlotAvailable = $('#chkSlot')
    category = $('#chkCategory')
    capacity = $('#txtCapacity')
    isFullyOccupied = $('#chkOccupied')
    isActive = $('#chkActive')
    showDvOldFW = $('#showDvOldFW')
    ddlFloor = $('#chkFloor')
    ddlWing = $('#chkWing')

    if (showDvOldFW.is(':checked') === false) {
      jsonData= {};
    //   newSlots = [];
      jsonData = {
        floorName: floorName.val(),
        wingName: wingName.val(),
        slots: newSlots,
        isFullyOccupied: isFullyOccupied.is(':checked') === false ?  false : true,
        isActive: isActive.is(':checked') === false ?  false : true,
      }
      insertAPI(backendURL, jsonData).then(data => {
        $("#btnSave").hide()
      }).catch((error) => {
        console.log(error)
      })
    } else {
      floorName = ddlFloor.val() !== '<-- select -->' ? ddlFloor.val() : ''
      wingName = ddlWing.val() !== '<-- select -->' ? ddlWing.val() : ''
      updateAPI(backendURL.concat(`/${floorName}/${wingName}`), newSlots)
        .then((response) => {
          $('#btnSave').hide()
        })
        .catch((error) => {
          console.log('Something went wrong')
        })
    }
  })
})
$("#btnUpdate").click(function () {
 jsonData = {
    capacity: $('#txtEditCapacity').val().trim().length === 0 ?  0 : $('#txtEditCapacity').val(),
    slotName: $('#txtEditSlot').val(),
    vehicleType: $('#chkEditCategory').val(),
    isAvailable: $('#chkEditSlot').is(':checked') === false ? false : true
 }
 updateAPI(backendURL.concat(`/floor/slot/${sigleSlot[0].slots[0]._id}`), jsonData).then(uSlot => {
  if(uSlot.data.acknowledged && uSlot.data.modifiedCount === 1 &&
    uSlot.data.matchedCount === 1){
     window.location.href = location.href
    }
    else {
      console.log("Something Went Wrong")
    }
 }).catch(error =>{
  console.log(error)
 })
})


var getAPI = async (fullURL) => {
  var response = await axios.get(fullURL)
  return response.data
}
var insertAPI = async(backendURL, jsonData) => {
    var response = await axios.post(backendURL, jsonData)
    return response.data
}
var updateAPI = async (backendURL, jsonData) => {
  var response = await axios.put(backendURL, jsonData)
  return response.data
}
var deleteAPI = async (backendURL) => {
  var response = await axios.delete(backendURL)
  return response.data
}
function removeFromSlots(floorId, slotId) {
  let result = confirm("Are you sure the delete the slot");
  if (result){
    deleteAPI(backendURL.concat(`/slot/${floorId}/${slotId}`)).then((record) => {
      if (record.success){
        window.location.href = location.href
      }
    }).catch((error) => {
      console.log(error)
    })
  } 
}
function removeRow(index) {
    newSlotHTML = ''
    newSlots.splice(index,1);
    for (var i=0; i< newSlots.length; i++){
        newSlotHTML +=
         '<tr>' +
         '<td>'+
         newSlots[i].slotName+
         '</td>'+
         '<td>'+
         newSlots[i].isAvailable+
         '</td>'+
         '<td>'+
         newSlots[i].vehicleType +
         '</td>'+
         '<td>'+
         newSlots[i].capacity +
         '</td>'+
         '<td onclick=\'removeRow("' +
         i +
         "\")' data-index='" +
         i +
         "'>" +
         '<span>'+
         "<i class='fa fa-trash'></i></span></td>"
    }
    $('#tAvailableSlots').html(newSlotHTML)
}

function editSlot(id) {
  var fullURL = backendURL.concat(`/floor/slot/${id}`);
  getAPI(fullURL).then(slot => {
    sigleSlot.push(slot.data[0]);
    $("#txtEditFloorName").val(slot.data[0].floorName)
    $("#txtEditWingName").val(slot.data[0].wingName)
    $("#txtEditSlot").val(slot.data[0].slots[0].slotName)
    slot.data[0].slots[0].isAvailable ? 
    $("#chkEditSlot").attr("checked", true):
    $("#chkEditSlot").attr("checked", false)
    $("#chkEditCategory").val(slot.data[0].slots[0].vehicleType)
    $("#txtEditCapacity").val(slot.data[0].slots[0].capacity)
    slot.data[0].slots[0].isFullyOccupied ?
     $("#chkEditOccupied").attr("checked", true):
     $("#chkEditOccupied").attr("checked", false)
     slot.data[0].isActive ?
     $("#chkEditActive").attr("checked", true):
     $("#chkEditActive").attr("checked", false)
  }).catch(error => {
    console.log(error)
  })
}

function addValidation() {
  var isValidated = false
  slotName = $('#txtSlot')
  category = $('#chkCategory')
  capacity = $('#txtCapacity')

  if (
    slotName.val().trim().length === 0 ||
    category.val() === '<-- select -->' ||
    capacity.val().trim().length === 0
  ) {
    slotName.css('border', '1px solid red')
    category.css('border', '1px solid red')
    capacity.css('border', '1px solid red')
  } else {
    slotName.css('border', '')
    category.css('border', '')
    capacity.css('border', '')
  }
  if (slotName.val().trim().length === 0) {
    slotName.css('border', '1px solid red')
    isValidated = false
  } else {
    slotName.css('border', '')
    isValidated = true
  }
  if (category.val() === '<-- select -->') {
    category.css('border', '1px solid red')
    isValidated = false
  } else {
    category.css('border', '')
    isValidated = true
  }
  if (capacity.val().trim().length === 0) {
    capacity.css('border', '1px solid red')
    isValidated = false
  } else {
    capacity.css('border', '')
    isValidated = true
  }
  return isValidated
}
