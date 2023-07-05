function customDatePickerFunc () {

    let now = new Date();

    let year = now.getFullYear();
    let month = now.getMonth();
    let day = (now.getDay() + 6) % 7;

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    jQuery(".datepicker-container")
        .attr("data-year", year)
        .attr("data-month", month + 1)
        .attr("data-day", day);
    jQuery("#year").text(year);

    
    jQuery('.month-name').text(monthNames[now.getMonth()]);
    
    jQuery('.prev-month').on("click", function() {
        month = now.getMonth();
        now.setMonth(month - 1);
        jQuery('.month-name').text(monthNames[now.getMonth()]);      
        jQuery('#year').text(now.getFullYear());
        updateGrid();
        jQuery('.datepicker-container').attr("data-month", now.getMonth() + 1);        
        jQuery('.datepicker-container').attr("data-year", now.getFullYear());  
    });

    jQuery('.next-month').on("click", function() {
        month = now.getMonth();
        now.setMonth(month + 1);
        jQuery('.month-name').text(monthNames[now.getMonth()]); 
        jQuery('#year').text(now.getFullYear());
        updateGrid();
        jQuery('.datepicker-container').attr("data-month", now.getMonth() + 1);        
        jQuery('.datepicker-container').attr("data-year", now.getFullYear());  
    });


    const updateGrid = () => {
        const year = now.getFullYear();
        const month = now.getMonth();
        now.setDate(1);
        const firstDay = (now.getDay() + 6) % 7;
        const difference = Math.abs(0 - firstDay);

        /**
         * Prev Date
         */
        let prevdate = new Date();
        prevdate.setMonth(now.getMonth());
        prevdate.setDate(0);

        let prevDays = [];

        for (let i = 0; i < difference; i++) {
            prevDays.unshift(prevdate.getDate());
            prevdate.setDate(prevdate.getDate() - 1);
        }

        /**
         * Next Date
         */

        let currentDate = new Date();
        currentDate.setMonth(currentDate.getMonth() + 1);
        currentDate.setDate(0);
        const newDate = new Date();
        newDate.setMonth(now.getMonth() + 1);
        newDate.setDate(0);
        let currentMonthDays = newDate.getDate();
        if (newDate.getFullYear() % 4 == 0) {
            currentMonthDays = currentMonthDays + 1;
        }
        const differenceDef = 42 - (prevDays.length + currentMonthDays);
        

        currentDate.setMonth(currentDate.getMonth() + 2);
        let nextDays = [];

        for (let i = 0; i < differenceDef; i++) {
            nextDays.push(currentDate.getDate());
            currentDate.setDate(currentDate.getDate() + 1);
        }

        let gridHtml = ``;

        prevDays.forEach(day => {
            gridHtml += `<div class="grid-item prev-item">${day}</div>`;
        })

        for (let i = 1; i < currentMonthDays + 1; i++) {
            gridHtml += `<div class="grid-item current-item">${i}</div>`;
        } 

        nextDays.forEach(day => {
            gridHtml += `<div class="grid-item next-item">
            ${day}
            </div>`
        });
     
        jQuery('.day-container').html(gridHtml);

        // js for selecting new date
        jQuery('.grid-item.current-item').on('click', function() {
            const day = jQuery(this).text();
            jQuery('.datepicker-container').attr('data-day', day);
            const month = jQuery('.datepicker-container').attr('data-month');
            const year = jQuery('.datepicker-container').attr('data-year');
            const date = day + "/" + month + "/" + year
            console.log(date)
            jQuery('.grid-item.current-item').removeClass('active');
            jQuery(this).addClass('active');
            jQuery('#selected-date').text(date);
            jQuery('.gfield--input-type-datepicker input').val(date);
            
        })
    }
    updateGrid();
    (function() {
        
        const today = new Date();

        const day = today.getDate();
        const month = today.getMonth() + 1; // Adding 1 because January is month 0
        const year = today.getFullYear();
        const todaysDate = day + "/" + month + "/" + year; 

        
        jQuery('.datepicker-container').attr('data-day', day);
        
        jQuery('#selected-date').text(todaysDate);
        
        jQuery('.current-item').eq(day - 1).addClass('active');
    })()
};

customDatePickerFunc();
jQuery( document ).on( 'gform_page_loaded', function( event, formId, currentPage ) {
    if (jQuery(".datepicker-container")) {
        customDatePickerFunc();
    }
} );