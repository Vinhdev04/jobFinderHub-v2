// Normalize various backend user shapes into a consistent frontend user object
export const normalizeUser = (u) => {
    if (!u) return null;

    // If response is nested (e.g., { user: ... }) allow passing inner object
    const user = u.user || u;

    const avatar = user.avatar || user.anhDaiDien || user.hinhDaiDien || null;

    // CV may be at top-level or inside thongTinSinhVien.cv
    let cv = null;
    if (user.cv) cv = user.cv;
    else if (user.thongTinSinhVien && user.thongTinSinhVien.cv) {
        // store as simple object with path/tenFile
        cv = user.thongTinSinhVien.cv;
    }

    const hocVan = user.hocVan || (user.thongTinSinhVien && user.thongTinSinhVien.hocVan) || [];
    const kyNang = user.kyNang || (user.thongTinSinhVien && user.thongTinSinhVien.kyNang) || [];

    return {
        _id: user._id || user.id || null,
        id: user._id || user.id || null,
        hoVaTen: user.hoVaTen || user.hoTen || user.name || '',
        email: user.email || '',
        soDienThoai: user.soDienThoai || user.phone || '',
        diaChi: user.diaChi || user.address || '',
        major: user.chuyenNganh || user.major || '',
        avatar,
        cv,
        hocVan: Array.isArray(hocVan) ? hocVan : [],
        kyNang: Array.isArray(kyNang) ? kyNang : [],
        vaiTro: user.vaiTro || user.role || null,
        createdAt: user.createdAt || user.created_at || null,
        raw: user
    };
};

export default normalizeUser;
