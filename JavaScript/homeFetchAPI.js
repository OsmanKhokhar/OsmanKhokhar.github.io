/* DATE */

import { getSpecificMenu } from "./api.js";

const date = new Date();

/*Check if date is weekend, if so set to next Monday*/
if(date.getDay() === 6){
    date.setDate(date.getDate() + 2);
}else if(date.getDay() === 0){
    date.setDate(date.getDate() + 1);
}

function getDayOfWeek(date){
    const weekday = new Date(date).getDay();
    return isNaN(weekday) ? null : ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'][weekday];
}

/* INITIALIZE DATE DISPLAY */

document.getElementById("tag").textContent = getDayOfWeek(date);
document.getElementById("datum").textContent = date.toLocaleDateString('en-GB');

/* Set initial active link styling */
document.querySelectorAll('.UntereNavigation a').forEach(dayLink => {
    if(dayLink.id === getDayOfWeek(date)){
        dayLink.classList.add('Current');
    }else{
        dayLink.classList.remove('Current');
    }
});

/* WEEK FUNCTIONALITY */

function changeDayOfWeek(offset){
    date.setDate(date.getDate() + offset);
    document.getElementById("tag").textContent = getDayOfWeek(date);
    document.getElementById("datum").textContent = date.toLocaleDateString('en-GB');

    /* Update meal data for the new date */
    LoadMealsData();

    /* Update active link styling */
    document.querySelectorAll('.UntereNavigation span').forEach(dayLink => {
        if(dayLink.id === getDayOfWeek(date)){
            dayLink.classList.add('Current');
        }else{
            dayLink.classList.remove('Current');
        }
    });
}

document.querySelectorAll('.UntereNavigation span').forEach(dayLink => {
    dayLink.addEventListener('click', function(){
        const selectedDay = this.id;
        const currentDay = getDayOfWeek(date);

        const dayOffsets = {
            'Montag': 1, 'Dienstag': 2, 'Mittwoch': 3, 'Donnerstag': 4, 'Freitag': 5
        };
        const offset = dayOffsets[selectedDay] - dayOffsets[currentDay];
        changeDayOfWeek(offset);
    });
});

/* WEEK ARROW FUNCTIONALITY */

document.querySelector('.WeekArrow.left').addEventListener('click', function(){
    if(getDayOfWeek(date) === 'Montag'){
        return;
    }
    changeDayOfWeek(- 1);
});

document.querySelector('.WeekArrow.right').addEventListener('click', function(){
    if(getDayOfWeek(date) === 'Freitag'){
        return;
    }
    changeDayOfWeek(1);
});

// API CALL MENU DATA

async function LoadMealsData(){
    const menuData = await getSpecificMenu(date.toISOString().split("T")[0]);
    
    if(menuData.error || menuData.message){
        console.error("Fehler beim Abrufen des Menüs:", menuData.error || menuData.message);
    }else{
        console.log("Menü API Response:", menuData);
    }

    //Fleischhaltiges Gericht: extract info from menuData and display it on the page
    // IDs: FleischName, FleischPreis, infoFleisch (Allergies and Additives) (infoFleisch is an image title)
    if(menuData.meals && menuData.meals.length > 0){
        const fleischhaltigeMeal = menuData.meals.find(meal => meal.category_id === 1);
        if(fleischhaltigeMeal){
            document.getElementById("FleischName").textContent = fleischhaltigeMeal.name;
            document.getElementById("FleischPreis").textContent = `${fleischhaltigeMeal.price} €`;
            document.getElementById("infoFleisch").textContent = `Allergene: ${fleischhaltigeMeal.allergies.join(", ")} | Zusatzstoffe: ${fleischhaltigeMeal.additives.join(", ")}`;
        }
    }

    //Vegetarisches Gericht: extract info from menuData and display it on the page
    // IDs: VegetarischName, VegetarischPreis
    if(menuData.meals && menuData.meals.length > 0){
        const vegetarischMeal = menuData.meals.find(meal => meal.category_id === 2);
        if(vegetarischMeal){
            document.getElementById("VegetarischName").textContent = vegetarischMeal.name;
            document.getElementById("VegetarischPreis").textContent = `${vegetarischMeal.price} €`;
            document.getElementById("infoVeggie").textContent = `Allergene: ${vegetarischMeal.allergies.join(", ")} | Zusatzstoffe: ${vegetarischMeal.additives.join(", ")}`;
        }
    }

    //Salat: extract info from menuData and display it on the page
    // IDs: SalatbarName, SalatbarPreis
    if(menuData.meals && menuData.meals.length > 0){
        const salatMeal = menuData.meals.find(meal => meal.category_id === 3);
        if(salatMeal){
            document.getElementById("SalatbarName").textContent = salatMeal.name;
            document.getElementById("SalatbarPreis").textContent = `${salatMeal.price} €`;
            document.getElementById("infoSalad").textContent = `Allergene: ${salatMeal.allergies.join(", ")} | Zusatzstoffe: ${salatMeal.additives.join(", ")}`;
        }
    }

    //Nachtisch: extract info from menuData and display it on the page
    // IDs: DessertName, DessertPreis
    if(menuData.meals && menuData.meals.length > 0){
        const nachtischMeal = menuData.meals.find(meal => meal.category_id === 4);
        if(nachtischMeal){
            document.getElementById("DessertName").textContent = nachtischMeal.name;
            document.getElementById("DessertPreis").textContent = `${nachtischMeal.price} €`;
            document.getElementById("infoDessert").textContent = `Allergene: ${nachtischMeal.allergies.join(", ")} | Zusatzstoffe: ${nachtischMeal.additives.join(", ")}`;
        }
    }

    //if no meals are available for the selected date, display a message
    if(menuData.error || menuData.message){
        document.getElementById("FleischName").textContent = "Keine Daten verfügbar";
        document.getElementById("FleischPreis").textContent = "0.00 €";
        document.getElementById("VegetarischName").textContent = "Keine Daten verfügbar";
        document.getElementById("VegetarischPreis").textContent = "0.00 €";
        document.getElementById("SalatbarName").textContent = "Keine Daten verfügbar";
        document.getElementById("SalatbarPreis").textContent = "0.00 €";
        document.getElementById("DessertName").textContent = "Keine Daten verfügbar";
        document.getElementById("DessertPreis").textContent = "0.00 €";
    }

}

LoadMealsData();