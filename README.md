# WellCare Hub

You are an expert team of Product Managers, UI/UX Designers, Senior React Developers, Supabase Architects, and Full Stack Engineers.

Your task is to build a modern, responsive, production-ready Doctor Clinic Management and Appointment Booking Web Application for a single doctor's clinic.

This is not a demo project.

Build it as a professional application that can be used daily in a real clinic.

The application should be elegant, user-friendly, mobile responsive, and easy for patients of all ages.

==================================================================

PROJECT OVERVIEW

==================================================================

The application consists of three modules:

1. Public Website (Patient Portal)

2. Doctor Dashboard

3. Receptionist Dashboard

Only Doctor and Receptionist require login.

Patients should NEVER create an account.

Patients should use their Mobile Number with OTP verification whenever they want to manage their appointments.

==================================================================

TECHNOLOGY

==================================================================

Frontend

- React

- TypeScript

- Tailwind CSS

Backend

- Supabase

Database

- PostgreSQL (Supabase)

Authentication

- Supabase Authentication

Roles

- Doctor

- Receptionist

Design

- Modern

- Minimal

- Premium Medical Theme

- Responsive

- Mobile First

- Professional Animations

- Fast Loading

==================================================================

PUBLIC WEBSITE

==================================================================

Create a beautiful landing page containing:

• Clinic Logo

• Clinic Name

• Doctor Photograph

• Doctor Name

• Qualifications

• Specialization

• Years of Experience

• About Doctor

• Education

• Professional Experience

• Certifications

• Clinic Gallery

• Available Treatments

• Consultation Fee

• Working Hours

• Emergency Contact

• WhatsApp Button

• Call Button

• Google Maps Location

• Testimonials

• Frequently Asked Questions

• Contact Form

Show a prominent

"Book Appointment"

button.

==================================================================

ABOUT DOCTOR

==================================================================

Display

Doctor Photograph

Biography

Education

Experience Timeline

Qualifications

Specializations

Awards

Memberships

Languages Spoken

==================================================================

TREATMENTS

==================================================================

Create a Treatments page.

Each treatment should display

Treatment Name

Description

Consultation Fee

Estimated Consultation Duration

==================================================================

BOOK APPOINTMENT

==================================================================

Patients should NOT create an account.

Booking Flow

Step 1

Patient enters

• Full Name

• Mobile Number (Required)

• Email (Optional)

• Age

• Gender

• Treatment

• Appointment Date

• Available Slot

• Reason for Visit (Optional)

The application should display ONLY available slots.

Already booked slots should never appear.

==================================================================

SLOT MANAGEMENT

==================================================================

Doctor should configure

Working Days

Morning Session

Evening Session

Slot Duration

Lunch Break

Maximum Patients Per Slot

Blocked Dates

Clinic Holidays

Automatically generate appointment slots.

Booked slots become unavailable.

Cancelled slots become available again.

==================================================================

PAYMENT

==================================================================

After selecting a slot,

display two payment options.

OPTION 1

Pay Online

Integrate Razorpay.

After successful payment

Appointment Status = Confirmed

Payment Status = Paid Online

Generate Booking ID.

OPTION 2

Pay at Clinic

Appointment Status = Confirmed

Payment Status = Pending

Generate Booking ID.

Doctor or Receptionist can later mark payment as Paid.

==================================================================

BOOKING CONFIRMATION

==================================================================

After successful booking

Display

Booking ID

Clinic Name

Doctor Name

Appointment Date

Appointment Time

Treatment

Payment Method

Payment Status

Clinic Address

Google Maps Button

Send booking confirmation through Email.

Design a professional booking confirmation page.

==================================================================

MANAGE APPOINTMENT

==================================================================

There should NOT be a Patient Login page.

Instead provide

"Manage Appointment"

Patient enters

Mobile Number

System sends OTP.

After OTP verification

Display every appointment booked using that mobile number.

Display

Booking ID

Date

Time

Treatment

Payment Method

Payment Status

Appointment Status

Allow

View Details

Cancel Appointment

==================================================================

CANCELLATION POLICY

==================================================================

Patient can cancel ONLY if

appointment time is more than one hour away.

When cancelled

Appointment Status = Cancelled

Release booked slot

Display success message

If appointment starts within one hour

Display

"This appointment cannot be cancelled within one hour of the scheduled appointment. Please contact the clinic."

==================================================================

DOCTOR LOGIN

==================================================================

Only Doctor has secure login.

Use Supabase Authentication.

==================================================================

DOCTOR DASHBOARD

==================================================================

Dashboard Cards

Today's Appointments

Upcoming Appointments

Completed Appointments

Cancelled Appointments

Pending Payments

Today's Revenue

Calendar

Recent Bookings

==================================================================

DOCTOR APPOINTMENT MANAGEMENT

==================================================================

Doctor can

View today's appointments

View upcoming appointments

View completed appointments

View cancelled appointments

View appointment history

Search appointments

Filter appointments

Calendar View

Appointment History should contain

Booking ID

Patient Name

Mobile Number

Age

Gender

Treatment

Reason for Visit

Appointment Date

Appointment Time

Booking Date

Payment Method

Payment Status

Appointment Status

Doctor Notes

Doctor should be able to add consultation notes after appointment.

==================================================================

PATIENT HISTORY

==================================================================

Clicking on a patient should display

Patient Details

Previous Appointments

Previous Treatments

Doctor Notes

Total Visits

Payment History

==================================================================

SEARCH

==================================================================

Doctor can search using

Booking ID

Patient Name

Mobile Number

Date

Treatment

==================================================================

FILTERS

==================================================================

Filter appointments by

Today

Tomorrow

Upcoming

Completed

Cancelled

Date Range

==================================================================

RECEPTIONIST LOGIN

==================================================================

Receptionist should have a separate secure login.

==================================================================

RECEPTIONIST DASHBOARD

==================================================================

Display

Today's Appointments

Upcoming Appointments

Checked-In Patients

Pending Payments

Cancelled Appointments

Quick Search

==================================================================

RECEPTIONIST FEATURES

==================================================================

Receptionist should be able to

Book appointments on behalf of patients

Book walk-in appointments

Book appointments received over phone

Search appointments

View today's schedule

View appointment history

Cancel appointments

Reschedule appointments

Check-In arriving patients

View patient details

View treatments

View payment status

Print booking confirmation

Share booking confirmation

Add internal notes

==================================================================

CHECK-IN

==================================================================

When patient arrives

Receptionist clicks

Check In

Appointment Status changes to

Checked In

Doctor dashboard should instantly reflect patient arrival.

==================================================================

PAYMENT MANAGEMENT

==================================================================

If payment method is

Pay at Clinic

Receptionist should see

Mark as Paid

When clicked

Payment Status changes to

Paid at Clinic

Store payment timestamp.

==================================================================

RESCHEDULE APPOINTMENT

==================================================================

Receptionist can

Select another available slot

Move appointment

Release old slot

Notify patient through Email

==================================================================

ROLE PERMISSIONS

==================================================================

Doctor

Full Access

Can manage

Clinic Profile

Doctor Profile

Treatments

Fees

Working Hours

Appointments

Payments

Reports

Receptionist

Can

Book appointments

Manage appointments

Check In patients

Reschedule appointments

Cancel appointments

Collect clinic payments

Search appointments

View patient details

Cannot

Modify clinic settings

Modify doctor profile

Delete records permanently

Manage users

==================================================================

CLINIC MANAGEMENT

==================================================================

Doctor should edit

Clinic Name

Clinic Logo

Doctor Photo

Doctor Profile

Qualifications

Experience

Treatments

Consultation Fee

Working Hours

Contact Number

WhatsApp Number

Clinic Address

Google Maps URL

Clinic Gallery

==================================================================

CALENDAR

==================================================================

Provide Monthly, Weekly and Daily calendar views.

Clicking an appointment opens complete details.

==================================================================

NOTIFICATIONS

==================================================================

Send Email notification for

Appointment Booking

Appointment Cancellation

Appointment Reschedule

==================================================================

DATABASE

==================================================================

Design a proper database schema for

Doctor

Receptionist

Clinic

Treatments

Patients

Appointments

Slots

Payments

OTP Verification

Gallery

Testimonials

Doctor Notes

==================================================================

UI REQUIREMENTS

==================================================================

Use a premium healthcare design.

Primary Color

Blue

Secondary Color

White

Rounded Cards

Professional Icons

Beautiful Forms

Smooth Animations

Loading Indicators

Toast Notifications

Confirmation Dialogs

Proper Form Validation

Responsive Layout

==================================================================

APPLICATION FLOW

==================================================================

Patient

Visit Website

↓

Book Appointment

↓

Select Slot

↓

Choose Payment Method

↓

Receive Booking Confirmation

↓

Manage Appointment using Mobile Number + OTP

↓

Cancel if appointment is more than one hour away

Doctor

Login

↓

Manage Schedule

↓

View Appointments

↓

View Patient History

↓

Add Consultation Notes

↓

Manage Clinic Information

Receptionist

Login

↓

Book Appointments

↓

Check In Patients

↓

Collect Payments

↓

Reschedule Appointments

↓

Cancel Appointments

==================================================================

DELIVERABLES

==================================================================

Generate the complete application with

• Responsive UI

• Complete Database Schema

• Supabase Integration

• Authentication

• OTP Verification Flow

• Appointment Booking System

• Dynamic Slot Management

• Doctor Dashboard

• Receptionist Dashboard

• Calendar View

• Appointment History

• Patient History

• Payment Management

• Razorpay Integration (configurable)

• Email Notification Integration

• Clean, reusable React components

• Modular architecture

• Production-quality code

The final application should be polished, intuitive, and fully functional for a real single-doctor clinic, with clean code and a professional user experience.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://drshreyasorthopedic.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/8ec5de39-4396-4f70-b465-49bced3ea343).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
