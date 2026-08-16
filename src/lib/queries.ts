import { queryOptions } from "@tanstack/react-query";
import {
  fetchClinic,
  fetchDoctors,
  fetchGallery,
  fetchTestimonials,
  fetchTreatments,
  fetchWorkingHours,
} from "@/lib/clinic";

export const clinicQO = queryOptions({ queryKey: ["clinic"], queryFn: fetchClinic });
export const doctorsQO = queryOptions({ queryKey: ["doctors"], queryFn: fetchDoctors });
export const treatmentsQO = queryOptions({ queryKey: ["treatments"], queryFn: fetchTreatments });
export const hoursQO = queryOptions({ queryKey: ["hours"], queryFn: fetchWorkingHours });
export const testimonialsQO = queryOptions({ queryKey: ["testimonials"], queryFn: fetchTestimonials });
export const galleryQO = queryOptions({ queryKey: ["gallery"], queryFn: fetchGallery });

export const GOOGLE_REVIEWS_URL = "https://maps.app.goo.gl/6WGqUa5tk2gTi1JD7";
