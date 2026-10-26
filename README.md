# Cantina-brief3
Project Overview

Cantina is a web application designed to help YouCode students view and organize their weekly meals from Monday to Friday while staying within a daily budget of 50 MAD.
The goal is to make meal planning easier through a simple, clear, and user-friendly interface.

Project Objectives

        Organize meals for the entire week.

        Display available meals and recipes.

        Manage recipes and their prices.

        Track daily meal expenses.

        Help users stay within their daily budget.
links
 github; https://github.com/fatimaezzahrae00/Cantina-brief3.git
planning :https://github.com/fatimaezzahrae00/Cantina-brief3.git






             Documentation
*1-What is Tailwind CSS?*

Tailwind CSS is a CSS framework that allows us to style HTML elements directly using small utility classes instead of writing CSS in a separate file.

Example from the project:

<body class="bg-stone-100 text-gray-800">

bg-stone-100: Sets a light background color.

text-gray-800: Sets the text color to dark gray.
*2--Margin*

Margin adds space outside an element.

mt-3>>>Adds margin to the top.

mb-4>>>>Adds margin to the bottom.

-mt-10 >>>>Adds a negative top margin.

*3- Padding*

Padding adds space inside an element, between its content and its borders.



p-4>>>Adds padding on all sides.

p-6>>>Adds more internal spacing.

px-6>>Adds horizontal padding.

py-3>>>Adds vertical padding.

pb-16>>>Adds padding at the bottom.

Example :

<main class="p-6">
*4 -Border*

Borders are used to separate elements and define their boundaries.





border>>>Adds a border.

border-b>>>Adds a bottom border.

border-gray-200>>Sets the border color to light gray.

border-t-4>>>Adds a top border with a thickness of 4.

rounded-lg>>>Rounds the corners.
<div class="bg-white rounded-2xl border border-gray-200 border-t-4 border-t-green-500 overflow-hidden">
   5. Colors and Text
bg-orange-500>>Orange background.

text-gray-500>>Gray text.

text-white>>>White text.

text-2xl>>>Large text.

text-xs>>>Very small text.

font-bold>>Bold text.
example 

<h2 class="text-2xl font-bold text-gray-900 mb-2">
    Menu de la semaine
</h2>
6. Flexbox

Flexbox is used to align and distribute elements inside a container.

flex>>Activates Flexbox.

items-center>>Aligns items vertically in the center.

justify-between>>Places items at opposite ends.

gap-3>>Adds space between items.

flex-1>>Allows an element to take available space.
exemple:
<div class="flex justify-between items-center mb-6">
    <p class="text-gray-500">
        Glissez une recette ou sélectionnez-la dans chaque créneau.
    </p>
    <div class="flex gap-3">
        <button>Cartes</button>
        <button>Tableau</button>
    </div>
</div>
*7. Grid*

Grid is used to organize elements into rows and columns.


grid>>Activates CSS Grid.

grid-cols-1>>Creates one column.

md:grid-cols-3>>Creates three columns on medium screens and larger.

lg:grid-cols-5>>Creates five columns on large screens and larger.

gap-4>>adds space between grid items.
<div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
