import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-primary-600 via-primary-500 to-accent-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMC0xMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-10"></div>

        {/* Floating Circles */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-32 h-32 bg-white rounded-full animate-float"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-white rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-white rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-white rounded-full animate-float" style={{ animationDelay: '1.5s' }}></div>
        </div>

        <div className="container mx-auto px-4 py-16 md:py-28 lg:py-40 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 md:mb-6 animate-slide-down leading-tight">
              Discover Your Signature Scent
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-orange-100 mb-3 md:mb-4 leading-relaxed animate-slide-up font-semibold">
              Where Luxury Meets Elegance
            </p>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-orange-200 mb-8 md:mb-12 leading-relaxed animate-slide-up">
              Explore our curated collection of luxury perfumes from world-renowned brands
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center animate-scale-in">
              <Link
                to="/products"
                className="bg-white text-primary-900 px-6 sm:px-8 md:px-10 py-3 md:py-4 rounded-full text-base md:text-lg font-semibold hover:bg-orange-50 transform hover:scale-110 transition-all duration-300 shadow-2xl flex items-center justify-center gap-2"
              >
                Shop Collection
                <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                to="/products"
                className="bg-transparent border-2 border-white text-white px-6 sm:px-8 md:px-10 py-3 md:py-4 rounded-full text-base md:text-lg font-semibold hover:bg-white hover:text-primary-900 transform hover:scale-110 transition-all duration-300 flex items-center justify-center gap-2"
              >
                Explore Scents
                <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Wave Shape */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
          </svg>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-5xl mx-auto">
            <div className="text-center animate-scale-in">
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent mb-2">500+</div>
              <p className="text-gray-600 font-semibold text-xs sm:text-sm md:text-base">Perfumes</p>
            </div>
            <div className="text-center animate-scale-in" style={{ animationDelay: '0.1s' }}>
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent mb-2">50+</div>
              <p className="text-gray-600 font-semibold text-xs sm:text-sm md:text-base">Brands</p>
            </div>
            <div className="text-center animate-scale-in" style={{ animationDelay: '0.2s' }}>
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent mb-2">10K+</div>
              <p className="text-gray-600 font-semibold text-xs sm:text-sm md:text-base">Customers</p>
            </div>
            <div className="text-center animate-scale-in" style={{ animationDelay: '0.3s' }}>
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent mb-2">100%</div>
              <p className="text-gray-600 font-semibold text-xs sm:text-sm md:text-base">Authentic</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 md:py-20 bg-gradient-to-b from-white to-orange-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-3 md:mb-4 animate-fade-in">
              Why Choose Us
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-gray-600">Experience luxury in every bottle</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
            <div className="group bg-white p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-3 hover:rotate-1 transition-all duration-500 animate-slide-up border-2 border-transparent hover:border-primary-200">
              <div className="bg-gradient-to-br from-primary-600 to-accent-600 w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300">
                <svg className="w-7 h-7 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-lg md:text-2xl font-bold text-gray-800 mb-2 md:mb-3">Premium Quality</h3>
              <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                100% authentic perfumes from the world's most prestigious brands
              </p>
            </div>

            <div className="group bg-white p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-3 hover:rotate-1 transition-all duration-500 animate-slide-up border-2 border-transparent hover:border-primary-200" style={{ animationDelay: '0.1s' }}>
              <div className="bg-gradient-to-br from-orange-600 to-red-600 w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300">
                <svg className="w-7 h-7 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
              </div>
              <h3 className="text-lg md:text-2xl font-bold text-gray-800 mb-2 md:mb-3">Free Shipping</h3>
              <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                Fast and secure delivery to your doorstep at no extra cost
              </p>
            </div>

            <div className="group bg-white p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-3 hover:rotate-1 transition-all duration-500 animate-slide-up border-2 border-transparent hover:border-primary-200" style={{ animationDelay: '0.2s' }}>
              <div className="bg-gradient-to-br from-red-600 to-orange-600 w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300">
                <svg className="w-7 h-7 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                </svg>
              </div>
              <h3 className="text-lg md:text-2xl font-bold text-gray-800 mb-2 md:mb-3">Gift Ready</h3>
              <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                Elegant packaging perfect for gifting to your loved ones
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Scent Categories */}
      <div className="py-12 md:py-20 bg-gradient-to-b from-orange-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-3 md:mb-4 animate-fade-in">
              Explore by Scent
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-gray-600">Find your perfect fragrance family</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-6 max-w-7xl mx-auto">
            <Link to="/products?scentType=floral" className="group">
              <div className="bg-white p-4 md:p-6 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-3 hover:rotate-3 transition-all duration-500 text-center border-2 border-transparent hover:border-pink-300 animate-scale-in">
                <div className="text-pink-500 mb-2 md:mb-3 group-hover:scale-125 transition-transform duration-300">
                  <svg className="w-10 h-10 md:w-12 md:h-12 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                </div>
                <h3 className="text-base md:text-lg font-bold text-gray-800 mb-1">Floral</h3>
                <p className="text-gray-600 text-xs md:text-sm">Romantic</p>
              </div>
            </Link>

            <Link to="/products?scentType=woody" className="group">
              <div className="bg-white p-4 md:p-6 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-3 hover:rotate-3 transition-all duration-500 text-center border-2 border-transparent hover:border-amber-300 animate-scale-in" style={{ animationDelay: '0.1s' }}>
                <div className="text-amber-700 mb-2 md:mb-3 group-hover:scale-125 transition-transform duration-300">
                  <svg className="w-10 h-10 md:w-12 md:h-12 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z"/>
                  </svg>
                </div>
                <h3 className="text-base md:text-lg font-bold text-gray-800 mb-1">Woody</h3>
                <p className="text-gray-600 text-xs md:text-sm">Warm</p>
              </div>
            </Link>

            <Link to="/products?scentType=citrus" className="group">
              <div className="bg-white p-4 md:p-6 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-3 hover:rotate-3 transition-all duration-500 text-center border-2 border-transparent hover:border-orange-300 animate-scale-in" style={{ animationDelay: '0.2s' }}>
                <div className="text-orange-500 mb-2 md:mb-3 group-hover:scale-125 transition-transform duration-300">
                  <svg className="w-10 h-10 md:w-12 md:h-12 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.97V5H10.9v1.69c-1.51.32-2.72 1.3-2.72 2.81 0 1.79 1.49 2.69 3.66 3.21 1.95.46 2.34 1.15 2.34 1.87 0 .53-.39 1.39-2.1 1.39-1.6 0-2.23-.72-2.32-1.64H8.04c.1 1.7 1.36 2.66 2.86 2.97V19h2.34v-1.67c1.52-.29 2.72-1.16 2.73-2.77-.01-2.2-1.9-2.96-3.66-3.42z"/>
                  </svg>
                </div>
                <h3 className="text-base md:text-lg font-bold text-gray-800 mb-1">Citrus</h3>
                <p className="text-gray-600 text-xs md:text-sm">Fresh</p>
              </div>
            </Link>

            <Link to="/products?scentType=oriental" className="group">
              <div className="bg-white p-4 md:p-6 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-3 hover:rotate-3 transition-all duration-500 text-center border-2 border-transparent hover:border-purple-300 animate-scale-in" style={{ animationDelay: '0.3s' }}>
                <div className="text-purple-600 mb-2 md:mb-3 group-hover:scale-125 transition-transform duration-300">
                  <svg className="w-10 h-10 md:w-12 md:h-12 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M21 11.11V5c0-1.1-.9-2-2-2h-6.11l.59-.59L12.07 1 10 3.07 7.93 1 6.52 2.41l.59.59H1c-1.1 0-2 .9-2 2v6.11l-.59-.59L0 13.93 2.07 16 0 18.07l1.41 1.41.59-.59V25c0 1.1.9 2 2 2h6.11l-.59.59L10.93 29 13 26.93 15.07 29l1.41-1.41-.59-.59H22c1.1 0 2-.9 2-2v-6.11l.59.59L26 18.07 23.93 16 26 13.93l-1.41-1.41-.59.59zM20 20H4V4h16v16z"/>
                  </svg>
                </div>
                <h3 className="text-base md:text-lg font-bold text-gray-800 mb-1">Oriental</h3>
                <p className="text-gray-600 text-xs md:text-sm">Exotic</p>
              </div>
            </Link>

            <Link to="/products?scentType=fresh" className="group">
              <div className="bg-white p-4 md:p-6 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-3 hover:rotate-3 transition-all duration-500 text-center border-2 border-transparent hover:border-blue-300 animate-scale-in" style={{ animationDelay: '0.4s' }}>
                <div className="text-blue-500 mb-2 md:mb-3 group-hover:scale-125 transition-transform duration-300">
                  <svg className="w-10 h-10 md:w-12 md:h-12 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.5 17c0 1.65-1.35 3-3 3s-3-1.35-3-3h2c0 .55.45 1 1 1s1-.45 1-1-.45-1-1-1H2v-2h9.5c1.65 0 3 1.35 3 3zM19 6.5C19 4.57 17.43 3 15.5 3S12 4.57 12 6.5h2c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5S16.33 8 15.5 8H2v2h13.5c1.93 0 3.5-1.57 3.5-3.5zm-.5 4.5H2v2h16.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5v2c1.93 0 3.5-1.57 3.5-3.5S20.43 11 18.5 11z"/>
                  </svg>
                </div>
                <h3 className="text-base md:text-lg font-bold text-gray-800 mb-1">Fresh</h3>
                <p className="text-gray-600 text-xs md:text-sm">Clean</p>
              </div>
            </Link>

            <Link to="/products?scentType=spicy" className="group">
              <div className="bg-white p-4 md:p-6 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-3 hover:rotate-3 transition-all duration-500 text-center border-2 border-transparent hover:border-red-300 animate-scale-in" style={{ animationDelay: '0.5s' }}>
                <div className="text-red-600 mb-2 md:mb-3 group-hover:scale-125 transition-transform duration-300">
                  <svg className="w-10 h-10 md:w-12 md:h-12 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm9 7h-6v13h-2v-6h-2v6H9V9H3V7h18v2z"/>
                  </svg>
                </div>
                <h3 className="text-base md:text-lg font-bold text-gray-800 mb-1">Spicy</h3>
                <p className="text-gray-600 text-xs md:text-sm">Bold</p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative py-16 md:py-24 bg-gradient-to-br from-primary-600 via-primary-500 to-accent-600 text-white overflow-hidden">
        {/* Floating Circles */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-20 w-32 h-32 md:w-40 md:h-40 bg-white rounded-full animate-float"></div>
          <div className="absolute bottom-10 right-20 w-24 h-24 md:w-32 md:h-32 bg-white rounded-full animate-float" style={{ animationDelay: '1.5s' }}></div>
          <div className="absolute top-1/2 left-1/3 w-16 h-16 md:w-24 md:h-24 bg-white rounded-full animate-float" style={{ animationDelay: '0.5s' }}></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-4 md:mb-6 animate-fade-in leading-tight">
            Ready to Find Your Scent?
          </h2>
          <p className="text-base md:text-lg lg:text-2xl text-orange-100 mb-8 md:mb-12 max-w-2xl mx-auto animate-slide-up leading-relaxed">
            Browse our exclusive collection and discover the perfect fragrance that matches your personality
          </p>
          <Link
            to="/products"
            className="bg-white text-primary-900 px-8 md:px-12 py-3 md:py-5 rounded-full text-base md:text-lg font-semibold hover:bg-orange-50 transform hover:scale-110 transition-all duration-300 shadow-2xl inline-flex items-center gap-2 md:gap-3 animate-scale-in"
          >
            Start Shopping
            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
