import { Link } from 'preact-router';

export function Error404() {
    return (
        <div>
            <h1>404 - Page Not Found</h1>
            <p>Sorry, the page you are looking for does not exist.</p>
            <Link href="/">Go back to Home</Link>
        </div>
    );
}