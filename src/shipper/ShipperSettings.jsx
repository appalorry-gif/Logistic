import React, { useState } from 'react';
import { User, Building, ShieldCheck, Camera, UploadCloud, FileText, Trash2, CheckCircle } from 'lucide-react';
import './ShipperSettings.css';

const ShipperSettings = () => {
  const [activeTab, setActiveTab] = useState('company');
  
  // Mock state for uploaded documents
  const [documents, setDocuments] = useState([
    { id: 1, name: 'GST_Registration_Cert.pdf', size: '1.2 MB', verified: true },
    { id: 2, name: 'Company_PAN_Card.png', size: '450 KB', verified: true }
  ]);

  const removeDocument = (id) => {
    setDocuments(documents.filter(doc => doc.id !== id));
  };

  return (
    <div className="settings-wrapper">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Account Settings</h2>
        <p className="text-sm text-gray-500">Manage your profile, company identity, and legal agreements.</p>
      </div>
      
      <div className="settings-container">
        
        {/* Settings Sidebar Nav */}
        <div className="settings-sidebar">
          <div className={`settings-tab ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => setActiveTab('profile')}>
            <User size={18} /> Personal Profile
          </div>
          <div className={`settings-tab ${activeTab === 'company' ? 'active' : ''}`} onClick={() => setActiveTab('company')}>
            <Building size={18} /> Company & Verification
          </div>
          <div className={`settings-tab ${activeTab === 'terms' ? 'active' : ''}`} onClick={() => setActiveTab('terms')}>
            <ShieldCheck size={18} /> Terms & Policy
          </div>
        </div>

        {/* Settings Content Area */}
        <div className="settings-content">
          
          {/* PROFILE TAB */}
          {activeTab === 'profile' && (
            <div className="animate-in fade-in duration-300">
              <h3 className="text-xl font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">Personal Information</h3>
              
              <div className="avatar-section">
                <div className="avatar-wrapper">
                  <span className="text-2xl font-bold text-gray-400">AS</span>
                  <div className="avatar-overlay"><Camera size={24} /></div>
                </div>
                <div>
                  <button className="bg-white border border-gray-300 text-gray-700 px-4 py-1.5 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors">Change Avatar</button>
                  <p className="text-xs text-gray-400 mt-2">JPG, GIF or PNG. Max size of 800K</p>
                </div>
              </div>

              <div className="form-grid two-cols">
                <div className="form-group">
                  <label className="form-label">First Name</label>
                  <input type="text" className="form-input" defaultValue="Arun" />
                </div>
                <div className="form-group">
                  <label className="form-label">Last Name</label>
                  <input type="text" className="form-input" defaultValue="Sharma" />
                </div>
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input type="email" className="form-input" defaultValue="arun@sharmalogistics.com" />
                </div>
                <div className="form-group">
                  <label className="form-label">Phone Number</label>
                  <input type="tel" className="form-input" defaultValue="+91 98765 43210" />
                </div>
                <div className="form-group">
                  <label className="form-label">Job Title / Role</label>
                  <input type="text" className="form-input" defaultValue="Logistics Manager" />
                </div>
              </div>
              <button className="save-btn">Save Profile Changes</button>
            </div>
          )}

          {/* COMPANY TAB */}
          {activeTab === 'company' && (
            <div className="animate-in fade-in duration-300">
              <h3 className="text-xl font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">Company Details</h3>
              
              <div className="form-grid two-cols">
                <div className="form-group">
                  <label className="form-label">Registered Company Name</label>
                  <input type="text" className="form-input" defaultValue="Sharma Logistics Pvt Ltd" />
                </div>
                <div className="form-group">
                  <label className="form-label">GSTIN / Tax ID</label>
                  <input type="text" className="form-input" defaultValue="27AADCS1234F1Z5" />
                </div>
              </div>
              
              <div className="form-group mb-8">
                <label className="form-label">Registered Address</label>
                <textarea className="form-input" rows="2" defaultValue="123, Logistics Park, Pune, Maharashtra - 411001"></textarea>
              </div>

              <h4 className="text-sm font-bold text-gray-900 mb-3">Registration Documents</h4>
              
              {/* File Upload Zone */}
              <div className="upload-zone">
                <UploadCloud size={36} className="mx-auto text-blue-500 mb-3" />
                <p className="text-sm font-bold text-gray-700">Click to upload or drag and drop</p>
                <p className="text-xs text-gray-500 mt-1">Upload GST Cert, PAN, or Incorporation Cert (PDF, JPG, PNG)</p>
              </div>

              {/* Uploaded Documents List */}
              <div className="mb-6">
                {documents.map(doc => (
                  <div key={doc.id} className="document-item">
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-50 p-2 rounded-lg text-blue-600"><FileText size={20}/></div>
                      <div>
                        <p className="text-sm font-bold text-gray-800">{doc.name}</p>
                        <p className="text-xs text-gray-500">{doc.size}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {doc.verified && <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full"><CheckCircle size={14}/> Verified</span>}
                      <button onClick={() => removeDocument(doc.id)} className="text-gray-400 hover:text-red-500 transition-colors" title="Remove Document">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <button className="save-btn">Submit for Verification</button>
            </div>
          )}

          {/* TERMS & POLICY TAB */}
          {activeTab === 'terms' && (
            <div className="animate-in fade-in duration-300">
              <h3 className="text-xl font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">Terms & Policies</h3>
              
              <div className="terms-box">
                <h4>1. Acceptance of Terms</h4>
                <p>By accessing and using the LogisticHub Shipper Portal, you accept and agree to be bound by the terms and provision of this agreement. Any participation in this service will constitute acceptance of this agreement.</p>
                
                <h4>2. Freight & Liability</h4>
                <p>The shipper warrants that all goods are accurately described, packaged appropriately for transport, and do not contain any illegal or hazardous materials not explicitly declared and approved prior to dispatch. Liability for undeclared hazardous materials rests solely with the shipper.</p>
                
                <h4>3. Payment Terms</h4>
                <p>Invoices are generated upon successful delivery verification. Payment terms are Net 30 days unless otherwise specified in your enterprise contract. Late payments are subject to a 1.5% monthly fee.</p>

                <h4>4. Data Processing & Privacy</h4>
                <p>We process your data strictly in accordance with our Privacy Policy. Location data, load details, and financial transactions are encrypted and only shared with assigned carriers to execute logistics operations.</p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-gray-200 mb-6">
                <div className="checkbox-group">
                  <input type="checkbox" id="tos" defaultChecked />
                  <label htmlFor="tos">I have read and agree to the <strong>Terms of Service</strong> and acknowledge my responsibilities as a shipper.</label>
                </div>
                <div className="checkbox-group mb-0">
                  <input type="checkbox" id="privacy" defaultChecked />
                  <label htmlFor="privacy">I agree to the <strong>Data Processing Agreement</strong> and allow necessary data sharing with carriers.</label>
                </div>
              </div>

              <button className="save-btn">Accept & Save Preferences</button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default ShipperSettings;