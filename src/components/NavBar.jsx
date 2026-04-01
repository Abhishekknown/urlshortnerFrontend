function NavBar({ onOpenCreateModal }) {
  return (
    <div className="navbar bg-base-100 border-b border-base-300 shadow-sm px-4 md:px-6">
      <div className="flex-1">
        <a className="text-2xl font-bold text-primary">Shortly</a>
      </div>
      <div className="flex-none">
        <button className="btn btn-primary" onClick={onOpenCreateModal}>
          Create Short URL
        </button>
      </div>
    </div>
  );
}

export default NavBar;