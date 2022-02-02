# How to get this running

Make sure you have node > 14.17.0 and yarn > 1.22.1 (but not over 2)

1. From the root directory run `yarn install`
2. Run `yarn next build`. It should build without issues
3. Run `yarn next start`. It should start up the server and you be able to access the app on `http://127.0.0.1:3000/`

Or if you don't want to do any of this just access it on vercel here:
https://payment-dashboard.vercel.app/

# Design Choices and things to notice

There are two pages in the application:

1. Payments dashboard: Table of payments and a form to add a new payment
2. Users: shows the list of available users that can make or receive payments

Even though users are aready visible in the sender/receiver select inputs of the form, I thought having a table visual would be helpful.

Other design notes:

1. Tailwindcss for styling, atomic classes are standard and easy to use while not feeling too cluttering
2. React-query for keeping server side state, much much much easier than redux imo.
3. NextJs inbuild routing system for the two pages
4. React-hook-form for the new payment for to simplify gathering all the inputs and sending the post request to the server
5. React-toastify for notifications on success/failure of form submission

# Payments Data Dashboard

This is a Circle Internet Financial interview problem to create a dashboard to display some peer-to-peer payments data and create new payments. You've been given a web server that produces some data describing a stream of peer-to-peer payments. You should create a React.js or Vue.js web dashboard that displays the data and creates new payments.

## Server

You are given a web server in the `server` directory that produces the payments data and accepts new payments data. The `server` directory contains a `README.md` with documentation of the data format and instructions for getting the server running. The server has a number of endpoints:

- It has a `GET /payments` endpoint that produces payments data. Every second it returns a different JSON object describing a single peer-to-peer payment. If you query it multiple times within the same clock second, it will return the same sample payment. Once the clock second has passed the endpoint will return a new sample payment, and you will be unable to retrieve the previous payment from the server again.
- It has a `POST /payments` endpoint that allows you to record a new payment on the server. This endpoint is intentionally flaky, and it will respond with an error code indicating success or failure. Please note that even if the payment is successful, it will not show up on the `GET /payments` endpoint.

You are required to interact with these two endpoints (more on this below), but you are welcome to use any other endpoints on the server that seem helpful (in particular the `GET /users` endpoint may be useful). The `README.md` in the `server` directory has instructions for interacting with each of the endpoints.

You may not modify the server's code, or use a different server, as part of your solution. You also may not add an intermediary server of your own; you can only write browser-side code (besides whatever HTTP server your chosen framework provides to serve its client bundle).

## Dashboard

Your job is to create a web dashboard to interact with the server. Your dashboard should have two main areas of functionality: listing existing payments, and creating new ones. It must be written in some form of [React.js](https://reactjs.org/) or [Vue.js](https://vuejs.org/), though you're welcome to use additional frameworks like [Next.js](https://nextjs.org/) or [React Redux](https://react-redux.js.org/) on top. You may not use a completely different reactive framework like [Angular.js](https://angularjs.org/).

### Listing Payments

Your dashboard should have a page that shows a list of the 25 most recent payments that reactively updates as the server produces new payments on the `GET /payments` endpoint, and incorporates created payments (described below). For each payment you should show the sender's name, receiver's name, amount, and currency. You should also have a search bar that allows dynamically filtering payments based on all fields returned by the API, not just the display names, amount, and currency. You should put a little work into your UI to make it reasonably attractive, though it doesn't have to be perfect. Using some pre-built components from a library like [Bootstrap](https://getbootstrap.com/) will be more than enough.

As described above the server will not allow you to query past payments, so you'll need to keep and update some client-side state to display historical payments. You don't need to worry about persisting payments data in the browser across refreshes; you can start with an empty list of payments each time the page is reloaded.

### Creating Payments

Your dashboard should also have a simple web form to allow you to submit new payments to the `POST /payments` endpoint. You should allow the user to enter the relevant details for the payment, and hen submit it. As described in the server's `README.md`, the `POST /payments` endpoint has a particular data format that it requires, and you must make requests in this format. Additionally, as described in the server's `README.md`, the endpoint is flaky, and will sometimes fail. If the endpoint responds with a `503` code (the flaky error code), your form must automatically keep trying to submit the payment until the server responds with a `201` code (the success error code). If you retry a payment after it is successful, the server will respond with a `409` code, and you should avoid your dashboard ever receiving this code. You should not require the user to keep pressing a "submit" button until the payment is successful; your code should invisibily handle the necessary retries.

As described in the server's `README.md`, payments must be created for valid users. The `GET /users` endpoint is provided to give you a list of valid users to use in this form. We recommend, though do not require, that you use it.

Finally, note that payments submitted via this endpoint will not show up in the `GET /payments` endpoint. However, you should still display payments created via the dashboard on your dashboard's list of payments. Essentially, your payment list should be merging the data from the server with the manually created payments.

## Logistics

You should return to your recruiter a tarball containing your web dashboard that satisfies the above requirements, along with a README that describes how to get it running and any design choices you made that you think are particularly interesting. We recognize that when job searching your time is valuable and so we think this exercise should take you about 5-7 hours; please do not feel that you need to spend much more time than that on it. Please reach out to your recruiter if you have any questions about the exercise. Thanks!
