const express = require('express');
const router = express.Router();
const {
    protect,
    authorize,
    isAdmin,
    isRecruiter
} = require('../middleware/auth');
const companyController = require('../controller/companyController');

// Public
router.get('/', companyController.getAllCompanies);
router.get('/:id', companyController.getCompanyById);

// Protected - recruiters can create, representatives can update, admin can delete/verify
router.post(
    '/',
    protect,
    authorize('nhan_vien_tuyen_dung', 'quan_tri_he_thong'),
    companyController.createCompany
);
router.put('/:id', protect, companyController.updateCompany);
router.delete('/:id', protect, isAdmin, companyController.deleteCompany);
router.put('/:id/verify', protect, isAdmin, companyController.verifyCompany);

module.exports = router;
