import services from "../Constants/services.js";
import Layout from "../Layouts/Layout";

function Services() {

  return (
    <Layout>
      <div className="min-h-[80vh] bg-gradient-to-r from-amber-50 to-orange-300 py-10">
        {/* Introduction Section */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-orange-600">Our Services</h1>
          <p className="mt-4 text-gray-600">
            Explore the range of services we offer to make your pizza experience unforgettable!
          </p>
        </div>

        {/* Services Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-5 md:px-10">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-500 hover:scale-105"
            >
              <div className="flex items-center justify-center text-6xl text-orange-500 mt-5">
                {service.icon}
              </div>
              <div className="p-5">
                <h2 className="text-xl font-semibold text-orange-600">
                  {service.title}
                </h2>
                <p className="mt-3 text-gray-600">{service.description}</p>
                <button className="mt-4 bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600">
                  {service.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default Services;
