# InternetEngineering-HW1
This is a small project done for the first homework of the Internet Engineering course of Shahid Beheshti University.
In this project we use libraries such as expressjs and winston to load up a webserver which can handle two requests.
The data file which is supposed to be present in the database folder as 'data.json' contains a number of geojson objects
that each represent an area of the world contained in a polygon.

The requests that we handle are as followed:
A get request which would respond with the name of the polygons that the point in the parameters of the request is part of,
and a put request which would permit users to add new polygons.

We also handle the common errors that may occur and log the request, their responses and all errors in two separate files.
