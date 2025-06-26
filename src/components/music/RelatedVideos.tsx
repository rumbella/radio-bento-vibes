
const RelatedVideos = () => (
  <div className="bg-[#1c1c1c] p-4 rounded-lg">
    <h3 className="mb-2 text-white font-semibold">Related Music Videos</h3>
    <div className="flex space-x-4 overflow-x-auto">
      <div className="w-24">
        <img src="https://res.cloudinary.com/thinkdigital/image/upload/v1748272969/pexels-pixabay-64002_to8eao.jpg" className="rounded-lg" alt="Free Mind" />
        <p className="text-xs mt-1">Free Mind</p>
      </div>
      <div className="w-24">
        <img src="https://res.cloudinary.com/thinkdigital/image/upload/v1748272969/pexels-pixabay-64002_to8eao.jpg" className="rounded-lg" alt="Try Me" />
        <p className="text-xs mt-1">Try Me</p>
      </div>
      <div className="w-24">
        <img src="https://res.cloudinary.com/thinkdigital/image/upload/v1748272969/pexels-pixabay-64002_to8eao.jpg" className="rounded-lg" alt="Damages" />
        <p className="text-xs mt-1">Damages</p>
      </div>
      <div className="w-24">
        <img src="https://res.cloudinary.com/thinkdigital/image/upload/v1748272969/pexels-pixabay-64002_to8eao.jpg" className="rounded-lg" alt="The Key" />
        <p className="text-xs mt-1">The Key</p>
      </div>
    </div>
  </div>
);

export default RelatedVideos;
