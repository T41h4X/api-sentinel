/** Public landing route redirects visitors into the application shell. */
import { redirect } from 'next/navigation';
/** Redirects to dashboard scaffold. @returns never */ export default function Home() {
  redirect('/dashboard');
}
