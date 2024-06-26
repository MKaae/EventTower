# Eventtower

Welcome to the Eventtower! This README file will guide you through all the necessary information about the project.

## Table of Contents

1. [Introduction](#introduction)
2. [Getting Started](#getting-started)
3. [Configuration](#configuration)
4. [Features](#features)
5. [Testing](#testing)
6. [Contributors](#contributors)
7. [License](#license)

## Introduction

Eventtower is an app created to help with handling community events. At the moment they are scattered all over the internet and with this we can finally have them in 1 place. This is created with inspiration from Deep Dip 2 and Trackmania's awesome developer community, and the free API's that they provide all of us. The app is build with Svelte and Express.

## Getting Started

To set up this project you should be able to just download a zip file and create your own .env file. After that you need to register for resend if you want to test the email service as well.

## Configuration

There is a test database setup up for you to use. You can change this to a real mongodb database or just test it with your local. The REST API is set up following REST conventions so should be easy to follow. When you create a new event make sure you call it BY THE SAME NAME as the game you want to link it to.

## Features

This project has features for implementing a new game, setting up a new events for the game, or editing old ones. It also provides new articles and it's possible to create your own new routes with Svelte. Every event have different API's provided by them since they are mostly community events, there's creating your own routes might be neccesary.

## Testing

We have two users with the following login. Admins are able to manipulate games and events and chat, while users are only able to chat.

Admin:
Username: admin
Email: admin@admin.com
Password: 123

User:
Username: user
Email: user@user.com
Password: 123

## Contributors

This project is written by MKaae & steffengroenandersen.

## License

MIT
