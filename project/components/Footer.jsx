export default function Footer() {
  return (
    <footer className="bg-black text-white py-10 mt-10">

      <div className="text-center">

        <h2 className="text-2xl font-bold">
          GiftStore
        </h2>

        <p className="text-gray-400 mt-2">
          Made with ❤️ for gifting happiness
        </p>

        <p className="text-gray-500 mt-4 text-sm">
          © {new Date().getFullYear()} GiftStore. All rights reserved.
        </p>

      </div>

    </footer>
  );
}