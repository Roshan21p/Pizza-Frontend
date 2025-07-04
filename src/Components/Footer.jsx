function Footer() {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <footer className="text-gray-600 body-font min-h-[10vh] ">
      <div className="bg-gradient-to-r from-amber-50 to-orange-300">
        <div className="container flex flex-col flex-wrap px-5 py-10 mx-auto sm:flex-row">
          <p className="text-center text-gray-500 sm:text-left">
            Copyright &copy; {year} Pizzify. All right reserved.
            <a
              href="https://www.linkedin.com/in/roshan21p"
              rel="noopener noreferrer"
              className="ml-1 text-gray-600"
              target="_blank"
            >
              @pizzify
            </a>
          </p>
          <span className="inline-flex justify-center mt-2 sm:ml-auto sm:mt-0 sm:justify-start">
            <a className="text-[#FF9110] hover:text-[#ff8f1077]">
              <svg
                fill="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
              </svg>
            </a>
            <a
              href="https://github.com/Roshan21p"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-3 text-[#FF9110] hover:text-[#ff8f1077]"
            >
              <svg fill="currentColor" className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.93.58.11.79-.25.79-.55v-2.01c-3.2.7-3.87-1.42-3.87-1.42-.53-1.35-1.3-1.71-1.3-1.71-1.06-.73.08-.72.08-.72 1.17.08 1.79 1.2 1.79 1.2 1.04 1.79 2.73 1.27 3.4.97.1-.75.41-1.27.74-1.56-2.55-.29-5.24-1.28-5.24-5.71 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.45.11-3.01 0 0 .97-.31 3.18 1.18a11.03 11.03 0 015.8 0C17.5 6.45 18.47 6.76 18.47 6.76c.63 1.56.23 2.72.11 3.01.74.81 1.19 1.84 1.19 3.1 0 4.44-2.69 5.42-5.25 5.7.42.36.79 1.09.79 2.2v3.26c0 .31.21.67.8.55A10.997 10.997 0 0023.5 12C23.5 5.73 18.27.5 12 .5z"
                />
              </svg>
            </a>

            <a className="ml-3 text-[#FF9110] hover:text-[#ff8f1077]">
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/roshan21p"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-3 text-[#FF9110] hover:text-[#ff8f1077]"
            >
              <svg
                fill="currentColor"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="0"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="none"
                  d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
                ></path>
                <circle cx="4" cy="4" r="2" stroke="none"></circle>
              </svg>
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
