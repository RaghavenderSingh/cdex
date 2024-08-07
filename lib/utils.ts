import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function getFirstName(str: string) {
  var arr = str.split(' ');
  console.log("arr", arr);
  if (arr.length === 1) {
    return arr[0];
  }
  return arr[0].charAt(0).toUpperCase() + arr[0].slice(1);;
}