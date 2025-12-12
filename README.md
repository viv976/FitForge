# FitForge
Fit Forge – Workout Tracker Website

Created by: Maharshi Desai, Mahin Patel, Vivaan Desai

Overview

Fit Forge is a fitness-themed web application built using HTML, CSS, and JavaScript.
It allows users to add workouts, view workout history, track total minutes, track total workouts, monitor daily streaks, delete entries, and clear workout history.
The website uses a modern dark theme, smooth animations, and is fully responsive.

HTML Explanation

The navigation bar is created using <header> and <nav> with menu links and a mobile hamburger icon.

The page is divided into multiple <section> elements such as the Hero Section, Workout Types, Exercise Tutorials, Workout Tracker, and Contact Section.

The Workout Tracker area includes a form defined as:
<form id="workoutForm">

It includes several <input>, <select>, and <textarea> fields to collect workout details.

A <table> displays all workouts added by the user, and each logged workout is inserted as a dynamically generated <tr> row using JavaScript.

The <footer> contains branding and copyright.

CSS Explanation

A global CSS reset is applied using:
* { margin: 0; padding: 0; box-sizing: border-box; }

Reusable CSS variables are defined in :root, including:
--color-primary, --color-bg-dark, --shadow-glow, and others.

Flexbox is used for aligning navigation items, buttons, and footer content.
CSS Grid is used to arrange workout types, exercise cards, and statistics.

Smooth transitions, glow effects, and animations provide a modern UI experience.
The website is fully responsive through media queries.
A dark color scheme is implemented using shades like #0a0a0a, #1a1a1a, and bright cyan highlights.

JavaScript Explanation

JavaScript handles all interactivity on the website.

Workout Form

The script reads values when the form is submitted, creates a workout object, stores it in an array, and saves it to localStorage.

Workout Table

Workouts are dynamically rendered into the table.
Each row includes a Delete button to remove a workout.
The application also supports clearing all stored workouts.

Statistics

Workout statistics update automatically, including total workouts, total minutes, and daily streaks.

Additional Features

Toast notifications appear for actions.
The date field is automatically set to today's date.
Saved workouts load from localStorage when the page opens.

Main Features

Add and delete workouts
Clear workout history
Track streaks and totals
Data saved automatically using localStorage
Smooth animations and clean UI
Fully responsive layout

Files Included

index.html — Main HTML layout
styles.css — Styling and responsiveness
app.js — JavaScript functionality
assets/ — Folder for images or icons (optional)

Purpose

This project demonstrates how HTML, CSS, and JavaScript can work together to create a functional fitness tracking website.
It is ideal for learning, practicing web development, or showcasing in a portfolio.
