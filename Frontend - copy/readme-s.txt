// 1.     ng new your-app-name --standalone
//     cd your-app-name
------------------------------------------------------------------
        -----------------------
            TailWind setup
        -----------------------
// 2.     npm install -D tailwindcss postcss autoprefixer
------------------------------------------------------------------
// 3.     npx tailwindcss init -p
------------------------------------------------------------------
  4.
     module.exports = {
      content: [
        "./src/**/*.{html,ts}", // Adjust path if your project structure differs
       ],
       theme: {
         extend: {},
       },
       plugins: [],
 };
-------------------------------------------------------------------
 5.     @tailwind base;
     @tailwind components;
     @tailwind utilities;
--------------------------------------------------------------------
 6.     <h1 class="text-3xl font-bold text-blue-600 text-center mt-8">
       Hello Tailwind CSS in Angular Standalone!    </h1>
----------------------------------------------------------------------
 7. Routing of admin components(all children components)
-----------------------------------------------------------------------
 Auth Guard
---------------------------------------------------------------------
Admin dashboard
|-> Color change of all charts
|-> Logout button 
|-> Fonts of texts
|-> Collapse with icons
|->Users,Orders section
------------------------------------------------------------------------
Landing Page
|->Different Component(book-slider)
|->attach in landing page component
|->fonts of text
|->Add data from backend using filter
--------------------------------------------------------------------
User side
|->dashboard
|->cart page(using bill and checkout)
|->mail to user about bill invoice
|->wishlist page 
--------------------------------------------------------------------
footer
----------------------------------------------------
swiper(optional)
------------------------------------------

