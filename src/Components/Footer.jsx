function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="text-gray-600 body-font min-h-[10vh]">
      <div className="bg-gradient-to-r from-amber-50 to-orange-300">
        <div className="container flex flex-col flex-wrap px-5 py-10 mx-auto sm:flex-row">
          <p className="text-center text-gray-500 sm:text-left">
            © {year} Pizzify. All rights reserved.
          </p>

          <span className="inline-flex justify-center mt-2 sm:ml-auto sm:mt-0">
            {/* GitHub */}
            <a
              href="https://github.com/Roshan21p"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#FF9110] hover:text-[#ff8f1077]"
              aria-label="GitHub"
            >
              <svg fill="currentColor" className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.93.58.11.79-.25.79-.55v-2.01c-3.2.7-3.87-1.42-3.87-1.42-.53-1.35-1.3-1.71-1.3-1.71-1.06-.73.08-.72.08-.72 1.17.08 1.79 1.2 1.79 1.2 1.04 1.79 2.73 1.27 3.4.97.1-.75.41-1.27.74-1.56-2.55-.29-5.24-1.28-5.24-5.71 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.45.11-3.01 0 0 .97-.31 3.18 1.18a11.03 11.03 0 015.8 0C17.5 6.45 18.47 6.76 18.47 6.76c.63 1.56.23 2.72.11 3.01.74.81 1.19 1.84 1.19 3.1 0 4.44-2.69 5.42-5.25 5.7.42.36.79 1.09.79 2.2v3.26c0 .31.21.67.8.55A10.997 10.997 0 0023.5 12C23.5 5.73 18.27.5 12 .5z"
                />
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/roshan21p"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-4 text-[#FF9110] hover:text-[#ff8f1077]"
              aria-label="LinkedIn"
            >
              <svg fill="currentColor" className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
