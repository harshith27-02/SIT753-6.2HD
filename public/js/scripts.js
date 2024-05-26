$(document).ready(function () {
    $('#datatablesSimple').DataTable();

    $('#sidebarToggle').on('click', function () {
        $('#layoutSidenav_nav').toggleClass('sb-sidenav-toggled');
    });

    $('#parkingEntryForm').on('submit', function (event) {
        event.preventDefault();

        const newParking = {
            vehicleNo: $('#plateNumber').val(),
            category: $('#Category').val(),
            rateCode: $('#rateCode').val(),
            rate: $('#rate').val(),
            checkinTime: $('#checkinTime').val(),
            checkoutTime: $('#checkoutTime').val(),
            totalHours: $('#totalHours').val(),
            totalAmount: $('#totalAmount').val(),
            paidStatus: $('#paidStatus').val(),
            paymentMode: $('#paymentMode').val()
        };

        $.ajax({
            url: '/api/parking',
            type: 'POST',
            data: JSON.stringify(newParking),
            contentType: 'application/json',
            success: function (data) {
                alert('New parking entry added successfully!');
                $('#exampleModal').modal('hide');
                location.reload(); // Reload to show the new entry
            },
            error: function (error) {
                console.error('Error:', error);
            }
        });
    });

    // Load parking entries
    $.getJSON('/api/parking', function (data) {
        const tableBody = $('#datatablesSimple tbody');
        tableBody.empty();
        data.forEach(entry => {
            const row = `<tr>
                <td>${entry.vehicleNo}</td>
                <td>${entry.category}</td>
                <td>${entry.rateCode}</td>
                <td>${entry.rate}</td>
                <td>${new Date(entry.checkinTime).toLocaleString()}</td>
                <td>${entry.checkoutTime ? new Date(entry.checkoutTime).toLocaleString() : ''}</td>
                <td>${entry.totalHours}</td>
                <td>${entry.totalAmount}</td>
                <td>${entry.paidStatus}</td>
                <td>${entry.paymentMode}</td>
            </tr>`;
            tableBody.append(row);
        });
    });
});
