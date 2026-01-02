import Layout from '../Layouts/Layout';

function About() {
  return (
    <Layout>
      <div className="flex flex-col-reverse py-5 md:flex-row bg-gradient-to-r from-amber-50 to-orange-300">
        {/* Map Section */}
        <div className="relative m-5 justify-start md:w-2/3">
          <iframe
            aria-label="Location map of Domino's Pizza - Lower Parel, Mumbai"
            className="rounded-md w-full"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d60348.867992528474!2d72.79244934381164!3d19.028345526534526!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7ce8c8b13eb51%3A0x52f62711ad301315!2sDomino&#39;s%20Pizza%20-%20Lower%20Parel!5e0!3m2!1sen!2sin!4v1734786256613!5m2!1sen!2sin"
            height="490"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          {/* Address Section */}
          <div className="bg-white rounded-md shadow-lg p-4 mt-4 sm:absolute sm:bottom-4 sm:left-4 sm:mt-0">
            <div className="text-left flex flex-col sm:flex-row justify-between gap-4">
              {/* Address Details */}
              <div className="flex flex-col">
                <h3 className="font-semibold text-lg">ADDRESS</h3>
                <p>
                  My Pizza app store, Mumbai,
                  <br /> near my home
                </p>
              </div>

              {/* Contact Section */}
              <div className="flex flex-col sm:ml-8">
                <h3 className="font-semibold text-lg">EMAIL</h3>
                <p className="text-orange-600">roshanprajapati2004@gmail.com</p>
                <h3 className="font-semibold text-lg mt-4">PHONE</h3>
                <p>123-456-7890</p>
              </div>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="flex flex-col m-5 md:px-8 md:w-1/3 text-black text-left">
          <h1 className="text-4xl text-[#FF9110]">About</h1>
          <p className="md:mt-8 mt-2 text-justify">
            At Pizza App, we are passionate about crafting exceptional pizzas that bring joy to
            every bite. Our journey began with a commitment to using the freshest, high-quality
            ingredients, combined with authentic recipes passed down through generations. Whether
            you're craving a classic Margherita or an adventurous specialty pizza, each creation is
            made with care and attention to detail. Join us in celebrating the art of pizza-making
            and indulge in flavors that will leave you wanting more. Welcome to the world of Pizza
            App, where every pizza tells a delicious story.
          </p>
        </div>
      </div>
    </Layout>
  );
}

export default About;
