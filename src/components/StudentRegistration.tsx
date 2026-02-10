import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card3D } from '@/components/Card3D';

const RequiredMark = () => <span className="text-red-500">*</span>;

interface StudentRegistrationProps {
  initialProgram?: string;
}

// Initialize Supabase client once
let supabaseClient: any = null;

async function getSupabaseClient() {
  if (supabaseClient) return supabaseClient;
  try {
    const { createClient } = await import('@supabase/supabase-js');
    const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
    const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string;
    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return null;
    supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    return supabaseClient;
  } catch (err) {
    console.error('Supabase init error:', err);
    return null;
  }
}

export default function StudentRegistration({ initialProgram }: StudentRegistrationProps) {
  const [passportFile, setPassportFile] = useState<File | null>(null);
  const [passportPreview, setPassportPreview] = useState<string | null>(null);
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [educationBackground, setEducationBackground] = useState('');
  const [currentLevel, setCurrentLevel] = useState('');
  const [parentGuardian, setParentGuardian] = useState('');
  const [guardianPhone, setGuardianPhone] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [nationalIdFile, setNationalIdFile] = useState<File | null>(null);
  const [votersIdFile, setVotersIdFile] = useState<File | null>(null);
  const [transcriptFile, setTranscriptFile] = useState<File | null>(null);
  const [supportingFiles, setSupportingFiles] = useState<File[]>([]);
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');
  const [previousInstitution, setPreviousInstitution] = useState('');
  const [gpa, setGpa] = useState('');
  const [statement, setStatement] = useState('');
  const [program, setProgram] = useState('MERN Stack');
  const [emergencyContactName, setEmergencyContactName] = useState('');
  const [emergencyContactPhone, setEmergencyContactPhone] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [sponsor, setSponsor] = useState('Self');
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showErrorModal, setShowErrorModal] = useState(false);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>, setter: (f: File | null) => void, previewSetter?: (s: string | null) => void) {
    const file = e.target.files && e.target.files[0] ? e.target.files[0] : null;
    
    // Security: File size check (max 5MB)
    if (file && file.size > 5 * 1024 * 1024) {
      setErrorMessage('File size exceeds 5MB limit.');
      return;
    }
    
    // Security: File type validation
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];
    if (file && !allowedTypes.includes(file.type)) {
      setErrorMessage('Invalid file type. Allowed: JPG, PNG, GIF, PDF');
      return;
    }
    
    setErrorMessage('');
    setter(file);
    if (file && previewSetter) {
      const url = URL.createObjectURL(file);
      previewSetter(url);
    } else if (previewSetter) {
      previewSetter(null);
    }
  }

  function handleSupportingFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files ? Array.from(e.target.files) : [];
    
    // Security: Validate all files
    for (const file of files) {
      if (file.size > 5 * 1024 * 1024) {
        setErrorMessage(`File "${file.name}" exceeds 5MB limit.`);
        return;
      }
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];
      if (!allowedTypes.includes(file.type)) {
        setErrorMessage(`File "${file.name}" has invalid type.`);
        return;
      }
    }
    
    setErrorMessage('');
    setSupportingFiles(files);
  }

  function handleSingleFileChange(e: React.ChangeEvent<HTMLInputElement>, setter: (f: File | null) => void) {
    const file = e.target.files && e.target.files[0] ? e.target.files[0] : null;
    
    // Security: File validation
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrorMessage('File size exceeds 5MB limit.');
        return;
      }
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];
      if (!allowedTypes.includes(file.type)) {
        setErrorMessage('Invalid file type. Allowed: JPG, PNG, GIF, PDF');
        return;
      }
    }
    
    setErrorMessage('');
    setter(file);
  }

  // Calculate age from DOB
  function getAge(dob: string): number {
    if (!dob) return 0;
    try {
      const today = new Date();
      const [year, month, day] = dob.split('-').map(Number);
      const birthDate = new Date(year, month - 1, day);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return Math.max(0, age);
    } catch {
      return 0;
    }
  }

  useEffect(() => {
    if (initialProgram) setProgram(initialProgram);
  }, [initialProgram]);

  function validate() {
    setErrorMessage('');
    
    if (!passportFile) return 'Passport picture is required.';
    if (!firstName.trim()) return 'First name is required.';
    if (!lastName.trim()) return 'Last name is required.';
    if (!email.trim()) return 'Email is required.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Please enter a valid email address.';
    if (!phone.trim()) return 'Phone number is required.';
    if (!/^\+?[0-9\s\-()]{7,}$/.test(phone)) return 'Please enter a valid phone number.';
    if (!dateOfBirth) return 'Date of birth is required.';
    if (getAge(dateOfBirth) < 16) return 'You must be at least 16 years old.';
    if (!nationalIdFile && !votersIdFile) return 'Either National ID or Voter ID is required.';
    if (!agreeToTerms) return 'You must agree to the terms and conditions.';
    if (sponsor === 'Parent/Guardian') {
      if (!parentGuardian.trim()) return 'Parent/Guardian name is required when they are sponsoring.';
      if (!guardianPhone.trim()) return 'Parent/Guardian phone is required when they are sponsoring.';
    }
    if (sponsor === 'Employer' && !companyName.trim()) return 'Company name is required when employer is sponsoring.';
    if (sponsor === 'Scholarship' && !companyName.trim()) return 'Organization/Scholarship name is required.';
    return null;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log('Form submission attempted');
    setErrorMessage('');
    setSuccessMessage('');
    
    const err = validate();
    if (err) {
      console.log('Validation error:', err);
      setErrorMessage(err);
      setShowErrorModal(true);
      return;
    }

    console.log('Validation passed, starting submission...');

    setSubmitting(true);
    try {
      // Generate PDF of application
      const { jsPDF } = await import('jspdf');

      // helper to convert File or object URL to data URL
      const fileToDataUrl = (file: File | null, objectUrl?: string): Promise<string | null> => new Promise(resolve => {
        if (!file && !objectUrl) return resolve(null);
        if (file) {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = () => resolve(null);
          reader.readAsDataURL(file);
        } else if (objectUrl) {
          fetch(objectUrl)
            .then(res => res.blob())
            .then(blob => {
              const r = new FileReader();
              r.onload = () => resolve(r.result as string);
              r.onerror = () => resolve(null);
              r.readAsDataURL(blob);
            })
            .catch(() => resolve(null));
        } else resolve(null);
      });

      let logoDataUrl = '';
      try {
        const logoResp = await fetch('/Logo.jpg');
        const logoBlob = await logoResp.blob();
        logoDataUrl = await new Promise<string>((res, rej) => {
          const r = new FileReader();
          r.onload = () => res(r.result as string);
          r.onerror = () => rej(null);
          r.readAsDataURL(logoBlob);
        });
      } catch {
        console.warn('Logo not found');
      }

      const passportDataUrl = await fileToDataUrl(passportFile, passportPreview || undefined);
      const nationalIdDataUrl = await fileToDataUrl(nationalIdFile);
      const votersIdDataUrl = await fileToDataUrl(votersIdFile);
      const transcriptDataUrl = await fileToDataUrl(transcriptFile);

      const doc = new jsPDF({ unit: 'pt', format: 'a4' });
      const pageWidth = doc.internal.pageSize.getWidth();

      // Set font to nearest equivalent of Century Gothic (helvetica as fallback)
      doc.setFont('helvetica');

      // ===== HEADER with logo and organization info =====
      const headerY = 40;
      doc.setFontSize(12);
      if (logoDataUrl) {
        try { doc.addImage(logoDataUrl, 'JPEG', 40, headerY, 60, 60); } catch { /* ignore */ }
      }
      doc.setFontSize(18);
      doc.setFont('helvetica', 'bold');
      doc.text('CONNECT SIERRA LEONE', 110, headerY + 18);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.text('Kenema City Plaza, Hangha Road Upstairs', 110, headerY + 36);
      doc.text('Phone: +23278192988 / +23272150563', 110, headerY + 52);

      doc.setLineWidth(1);
      doc.line(40, headerY + 72, pageWidth - 40, headerY + 72);

      // ===== FORM FEE SECTION =====
      doc.setFillColor(240, 248, 255);
      doc.rect(40, headerY + 78, pageWidth - 80, 55, 'F');
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.text('FORM FEE PAYMENT', 50, headerY + 95);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.text('Amount: SLe 100.00 | Bank: Guaranty Trust Bank (GT Bank) Kenema', 50, headerY + 108);
      doc.text('Account Number: 206 3613925 110 | Receipt Required', 50, headerY + 120);
      doc.setFont('helvetica', 'italic');
      doc.text('Must bring receipt as proof of payment before class begins', 50, headerY + 133);

      // Title
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(16);
      doc.text('STUDENT APPLICATION FORM', 40, headerY + 160);

      // Passport image below title
      let currentY = headerY + 180;
      if (passportDataUrl) {
        try {
          const imgW = 80;
          const imgH = 100;
          doc.addImage(passportDataUrl, 'JPEG', 40, currentY, imgW, imgH);
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(8);
          doc.text('Passport Photo', 40, currentY + imgH + 10);
          currentY += imgH + 25;
        } catch { /* ignore */ }
      }

      // ===== APPLICANT DETAILS =====
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      const lines = [
        ['First Name', firstName],
        ['Middle Name', middleName || '-'],
        ['Last Name', lastName],
        ['Age', String(getAge(dateOfBirth))],
        ['Email', email],
        ['Phone', phone],
        ['Address', address],
        ['Date of Birth', dateOfBirth],
        ['Gender', gender],
        ['Program', program],
        ['Sponsor', sponsor],
        ...(sponsor === 'Parent/Guardian' ? [['Guardian Name', parentGuardian], ['Guardian Phone', guardianPhone]] : []),
        ...(sponsor === 'Employer' ? [['Company Name', companyName]] : []),
        ...(sponsor === 'Scholarship' ? [['Organization', companyName]] : []),
        ['Previous Institution', previousInstitution || '-'],
        ['GPA/Grade', gpa || '-'],
        ['Emergency Contact', emergencyContactName + ' / ' + emergencyContactPhone],
      ];

      for (const [label, value] of lines) {
        if (currentY > doc.internal.pageSize.getHeight() - 150) {
          doc.addPage();
          currentY = 60;
        }
        doc.setFont('helvetica', 'bold');
        doc.text(`${label}:`, 40, currentY);
        doc.setFont('helvetica', 'normal');
        doc.text(String(value || '-'), 150, currentY);
        currentY += 14;
      }

      // ===== STATEMENT OF PURPOSE =====
      if (statement) {
        if (currentY > doc.internal.pageSize.getHeight() - 150) {
          doc.addPage();
          currentY = 60;
        }
        currentY += 6;
        doc.setFont('helvetica', 'bold');
        doc.text('Statement of Purpose:', 40, currentY);
        currentY += 12;
        doc.setFont('helvetica', 'normal');
        const wrappedStatement = doc.splitTextToSize(statement, pageWidth - 80);
        doc.text(wrappedStatement, 40, currentY);
        currentY += wrappedStatement.length * 12 + 10;
      }

      // ===== ATTACHED DOCUMENTS =====
      if (passportDataUrl || nationalIdDataUrl || votersIdDataUrl || transcriptDataUrl) {
        if (currentY > doc.internal.pageSize.getHeight() - 200) {
          doc.addPage();
          currentY = 60;
        }
        currentY += 6;
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(11);
        doc.text('ATTACHED DOCUMENTS', 40, currentY);
        currentY += 18;
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);

        const imgW = 70;
        const imgH = 90;
        const colWidth = 140;
        let col = 0;

        // Document display with labels
        const docData = [
          { url: nationalIdDataUrl, label: 'National ID' },
          { url: votersIdDataUrl, label: 'Voters ID' },
          { url: transcriptDataUrl, label: 'Transcript' },
        ];

        for (const doc_item of docData) {
          if (doc_item.url) {
            try {
              const xPos = 40 + (col % 2) * colWidth;
              const yPos = currentY + Math.floor(col / 2) * (imgH + 20);
              doc.addImage(doc_item.url, 'JPEG', xPos, yPos, imgW, imgH);
              doc.text(doc_item.label, xPos, yPos + imgH + 8);
              col++;
            } catch { /* ignore */ }
          }
        }
        currentY += (Math.ceil(col / 2) * (imgH + 20)) + 20;
      }

      // ===== CLASS FEES AND INSTALLMENT PLAN =====
      if (currentY > doc.internal.pageSize.getHeight() - 220) {
        doc.addPage();
        currentY = 60;
      }

      doc.setFillColor(245, 245, 245);
      doc.rect(40, currentY, pageWidth - 80, 80, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.text('CLASS FEES & PAYMENT PLAN', 50, currentY + 15);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.text('Total Class Fee: SLe 500.00 (can be paid in installments)', 50, currentY + 30);
      doc.text('Installment Option: SLe 125.00 per week (4 weeks)', 50, currentY + 43);
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(8);
      doc.text('⚠ NO PAYMENT = NO CLASS. Late payments will result in class suspension.', 50, currentY + 58);
      doc.text('Student bears consequences of late or missed payments.', 50, currentY + 68);
      currentY += 90;

      // Installment plan table
      if (currentY > doc.internal.pageSize.getHeight() - 200) {
        doc.addPage();
        currentY = 60;
      }

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.text('INSTALLMENT PLAN TABLE', 40, currentY);
      currentY += 14;

      // Table header
      doc.setFont('helvetica', 'bold');
      doc.setFillColor(200, 200, 200);
      doc.rect(40, currentY - 8, pageWidth - 80, 14, 'F');
      doc.text('Week', 50, currentY);
      doc.text('Amount (SLe)', 150, currentY);
      doc.text('Due Date', 280, currentY);
      doc.text('Status', 380, currentY);
      currentY += 16;

      // Table rows
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      const startDate = new Date();
      for (let i = 1; i <= 4; i++) {
        const weekDate = new Date(startDate);
        weekDate.setDate(weekDate.getDate() + (i * 7));
        doc.text(`Week ${i}`, 50, currentY);
        doc.text('SLe 125.00', 150, currentY);
        doc.text(weekDate.toLocaleDateString(), 280, currentY);
        doc.text('Pending', 380, currentY);
        currentY += 12;
      }

      // Footer
      currentY += 10;
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(8);
      doc.text('Generated: ' + new Date().toLocaleString() + ' | Connect Sierra Leone Student Portal', 40, doc.internal.pageSize.getHeight() - 25);

      const pdfBlob = doc.output('blob');

      // Trigger download for user
      const url = URL.createObjectURL(pdfBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${firstName}-${lastName}-application.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);

      // Persist optimistic applicant to localStorage immediately so it appears in the applicants view
      try {
        const key = 'connect_applicants';
        const applicant = {
          id: Date.now(),
          first_name: firstName,
          middle_name: middleName,
          last_name: lastName,
          email,
          phone,
          program,
          sponsor,
          sponsor_name: sponsor === 'Parent/Guardian' ? parentGuardian : (sponsor === 'Employer' || sponsor === 'Scholarship' ? companyName : null),
          age: getAge(dateOfBirth),
          submitted_at: new Date().toISOString(),
          pdf_url: null,
          passport_url: null,
        };
        const raw = localStorage.getItem(key) || '[]';
        let list = [];
        try { list = JSON.parse(raw); } catch { list = []; }
        list.push(applicant);
        localStorage.setItem(key, JSON.stringify(list));
      } catch (lsErr) {
        console.warn('localStorage save failed', lsErr);
      }

      // Upload to Supabase
      try {
        const supabase = await getSupabaseClient();
        if (!supabase) {
          throw new Error('Supabase environment variables not configured');
        }

        const bucket = (import.meta.env.VITE_SUPABASE_BUCKET as string) || 'application_doc';
        const timestamp = Date.now();
        const safe = (s: string) => s.replace(/[^a-z0-9_.-]/gi, '_').slice(0, 120);

        // Upload PDF
        const pdfPath = `applications/${timestamp}_${safe(firstName)}_${safe(lastName)}_application.pdf`;
        const { error: pdfErr } = await supabase.storage.from(bucket).upload(pdfPath, pdfBlob, { upsert: true });
        if (pdfErr) throw new Error(`PDF upload failed: ${pdfErr.message}`);
        const pdfUrl = supabase.storage.from(bucket).getPublicUrl(pdfPath).data.publicUrl;

        // Upload files
        let passportUrl = null;
        if (passportFile) {
          const pPath = `applications/${timestamp}_${safe(firstName)}_passport.${passportFile.name.split('.').pop()}`;
          const { error } = await supabase.storage.from(bucket).upload(pPath, passportFile, { upsert: true });
          if (!error) passportUrl = supabase.storage.from(bucket).getPublicUrl(pPath).data.publicUrl;
        }

        let nationalIdUrl = null;
        if (nationalIdFile) {
          const nPath = `applications/${timestamp}_${safe(firstName)}_nationalid.${nationalIdFile.name.split('.').pop()}`;
          const { error } = await supabase.storage.from(bucket).upload(nPath, nationalIdFile, { upsert: true });
          if (!error) nationalIdUrl = supabase.storage.from(bucket).getPublicUrl(nPath).data.publicUrl;
        }

        let votersIdUrl = null;
        if (votersIdFile) {
          const vPath = `applications/${timestamp}_${safe(firstName)}_voterid.${votersIdFile.name.split('.').pop()}`;
          const { error } = await supabase.storage.from(bucket).upload(vPath, votersIdFile, { upsert: true });
          if (!error) votersIdUrl = supabase.storage.from(bucket).getPublicUrl(vPath).data.publicUrl;
        }

        let transcriptUrl = null;
        if (transcriptFile) {
          const tPath = `applications/${timestamp}_${safe(firstName)}_transcript.${transcriptFile.name.split('.').pop()}`;
          const { error } = await supabase.storage.from(bucket).upload(tPath, transcriptFile, { upsert: true });
          if (!error) transcriptUrl = supabase.storage.from(bucket).getPublicUrl(tPath).data.publicUrl;
        }

        // Insert record
        const { error: insertErr } = await supabase.from('applications').insert([{
          first_name: firstName,
          middle_name: middleName,
          last_name: lastName,
          email,
          phone,
          address,
          date_of_birth: dateOfBirth,
          age: getAge(dateOfBirth),
          gender,
          program,
          sponsor,
          sponsor_name: sponsor === 'Parent/Guardian' ? parentGuardian : (sponsor === 'Employer' || sponsor === 'Scholarship' ? companyName : null),
          previous_institution: previousInstitution,
          gpa,
          statement,
          emergency_contact_name: emergencyContactName,
          emergency_contact_phone: emergencyContactPhone,
          passport_url: passportUrl,
          pdf_url: pdfUrl,
          national_id_url: nationalIdUrl,
          voters_id_url: votersIdUrl,
          transcript_url: transcriptUrl,
          submitted_at: new Date().toISOString(),
        }]);

        if (insertErr) throw new Error(`Database insert failed: ${insertErr.message}`);

        // Persist a lightweight copy of the applicant to localStorage for quick in-browser viewing
        try {
          const applicant = {
            id: timestamp,
            first_name: firstName,
            middle_name: middleName,
            last_name: lastName,
            email,
            phone,
            program,
            sponsor,
            sponsor_name: sponsor === 'Parent/Guardian' ? parentGuardian : (sponsor === 'Employer' || sponsor === 'Scholarship' ? companyName : null),
            age: getAge(dateOfBirth),
            submitted_at: new Date().toISOString(),
            pdf_url: pdfUrl || null,
            passport_url: passportUrl || null,
          };
          const key = 'connect_applicants';
          const raw = localStorage.getItem(key) || '[]';
          const list = JSON.parse(raw);
          list.push(applicant);
          localStorage.setItem(key, JSON.stringify(list));
        } catch (lsErr) {
          console.warn('Failed to save applicant to localStorage', lsErr);
        }

        setSuccessMessage('✓ Application submitted successfully! PDF downloaded and all data securely stored.');
        setSubmitting(false);
        
        // Reset form
        setTimeout(() => {
          setFirstName(''); setMiddleName(''); setLastName(''); setEmail(''); setPhone(''); setAddress('');
          setDateOfBirth(''); setGender(''); setProgram('MERN Stack'); setStatement('');
          setPassportFile(null); setPassportPreview(null);
          setNationalIdFile(null); setVotersIdFile(null); setTranscriptFile(null);
          setParentGuardian(''); setGuardianPhone(''); setCompanyName('');
          setSponsor('Self'); setAgreeToTerms(false);
          setSuccessMessage('');
        }, 3000);
      } catch (dbErr: any) {
        throw new Error(`Storage/Database error: ${dbErr.message}`);
      }
    } catch (error: any) {
      console.error('Submission error:', error);
      setErrorMessage(`Error: ${error.message || 'Submission failed. Please try again.'}`);
      setSubmitting(false);
    }
  }

  return (
    <section className="mt-16">
      {/* Error Modal */}
      {showErrorModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full transform transition-all">
            <div className="bg-gradient-to-r from-red-500 to-red-600 px-6 py-4 rounded-t-xl">
              <h2 className="text-white font-bold text-lg flex items-center gap-2">
                <span className="text-2xl">⚠️</span> Validation Error
              </h2>
            </div>
            <div className="p-6">
              <p className="text-gray-700 text-center mb-6 leading-relaxed font-medium">{errorMessage}</p>
              <button
                onClick={() => setShowErrorModal(false)}
                className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-colors"
              >
                Okay, Got It
              </button>
            </div>
          </div>
        </div>
      )}

      <Card3D className="max-w-4xl mx-auto p-6 lg:p-8">
        {/* Error & Success Messages */}
        {errorMessage && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {errorMessage}
          </div>
        )}
        {successMessage && (
          <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
            {successMessage}
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left - Passport & Summary */}
          <div className="w-full lg:w-1/3">
            <div className="text-center mb-4">
              <img src="/Logo.jpg" alt="Connect Sierra Leone" className="mx-auto w-24 h-24 object-contain mb-3" />
              <h2 className="text-2xl font-display font-bold">Apply — {program}</h2>
              <p className="text-sm text-muted-foreground">Complete your application to secure a spot.</p>
            </div>

            <div className="border-dashed border-2 border-border rounded-lg p-4 flex flex-col items-center gap-3">
              <label className="text-sm font-medium">Passport Photo <RequiredMark /></label>
              <div className="w-40 h-40 bg-muted/10 rounded-md flex items-center justify-center overflow-hidden border">
                {passportPreview ? (
                  <img src={passportPreview} alt="passport preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center text-sm text-muted-foreground px-2">
                    Recommended: 600x600px
                    <br />2in x 2in
                    <br />Plain background
                  </div>
                )}
              </div>
              <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, setPassportFile, setPassportPreview)} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-2">Accepted: JPG, PNG, GIF. Max 5MB.</p>
            </div>

            <div className="mt-6 space-y-2">
              <div className="text-sm"><strong>Name:</strong> {firstName} {middleName} {lastName}</div>
              <div className="text-sm"><strong>Age:</strong> {dateOfBirth ? getAge(dateOfBirth) : '-'}</div>
              <div className="text-sm"><strong>Email:</strong> {email}</div>
              <div className="text-sm"><strong>Phone:</strong> {phone}</div>
              <div className="text-sm"><strong>Program:</strong> {program}</div>
              <div className="text-sm"><strong>Sponsor:</strong> {sponsor}</div>
            </div>
          </div>

          {/* Right - Form Fields */}
          <div className="w-full lg:w-2/3">
            <p className="text-sm text-muted-foreground mb-4">Fields marked with <span className="text-red-500">*</span> are required.</p>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">First Name <RequiredMark /></label>
                <input value={firstName} onChange={(e) => setFirstName(e.target.value)} className="input w-full" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Middle Name (optional)</label>
                <input value={middleName} onChange={(e) => setMiddleName(e.target.value)} className="input w-full" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Last Name <RequiredMark /></label>
                <input value={lastName} onChange={(e) => setLastName(e.target.value)} className="input w-full" />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Address</label>
                <input value={address} onChange={(e) => setAddress(e.target.value)} className="input w-full" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Date of Birth <RequiredMark /></label>
                <input type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} className="input w-full" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Gender</label>
                <select value={gender} onChange={(e) => setGender(e.target.value)} className="input w-full">
                  <option value="">Select</option>
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="Other">Other</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Program Applying For</label>
                <select value={program} onChange={(e) => setProgram(e.target.value)} className="input w-full">
                  <option>MERN Stack</option>
                  <option>HTML & CSS</option>
                  <option>JavaScript</option>
                  <option>GIT & GitHub</option>
                  <option>GitHub Copilot</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Previous Institution</label>
                <input value={previousInstitution} onChange={(e) => setPreviousInstitution(e.target.value)} className="input w-full" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">GPA / Grade</label>
                <input value={gpa} onChange={(e) => setGpa(e.target.value)} className="input w-full" />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Statement of Purpose (short)</label>
                <textarea value={statement} onChange={(e) => setStatement(e.target.value)} className="input w-full h-28" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Email <RequiredMark /></label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input w-full" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Phone <RequiredMark /></label>
                <input value={phone} onChange={(e) => setPhone(e.target.value)} className="input w-full" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Education Background</label>
                <input value={educationBackground} onChange={(e) => setEducationBackground(e.target.value)} className="input w-full" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Current Level</label>
                <input value={currentLevel} onChange={(e) => setCurrentLevel(e.target.value)} className="input w-full" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Sponsorship <RequiredMark /></label>
                <select value={sponsor} onChange={(e) => setSponsor(e.target.value)} className="input w-full">
                  <option>Self</option>
                  <option>Parent/Guardian</option>
                  <option>Scholarship</option>
                  <option>Employer</option>
                  <option>Other</option>
                </select>
                <p className="text-xs text-muted-foreground mt-1">Choose who will pay the course fees.</p>
              </div>

              {/* Conditional Sponsor Fields */}
              {sponsor === 'Parent/Guardian' && (
                <>
                  <div>
                    <label className="block text-sm font-medium mb-1">Parent/Guardian Name <RequiredMark /></label>
                    <input value={parentGuardian} onChange={(e) => setParentGuardian(e.target.value)} className="input w-full" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Parent/Guardian Phone <RequiredMark /></label>
                    <input value={guardianPhone} onChange={(e) => setGuardianPhone(e.target.value)} className="input w-full" />
                  </div>
                </>
              )}

              {sponsor === 'Employer' && (
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">Company Name <RequiredMark /></label>
                  <input value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="Enter company name" className="input w-full" />
                </div>
              )}

              {sponsor === 'Scholarship' && (
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">Scholarship Organization <RequiredMark /></label>
                  <input value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="Enter organization name" className="input w-full" />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium mb-1">National ID (required if no Voter ID)</label>
                <input type="file" accept="image/*,application/pdf" onChange={(e) => handleSingleFileChange(e, setNationalIdFile)} />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Voter ID (required if no National ID)</label>
                <input type="file" accept="image/*,application/pdf" onChange={(e) => handleSingleFileChange(e, setVotersIdFile)} />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Transcript (optional)</label>
                <input type="file" accept="image/*,application/pdf" onChange={(e) => handleSingleFileChange(e, setTranscriptFile)} />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Emergency Contact Name</label>
                <input value={emergencyContactName} onChange={(e) => setEmergencyContactName(e.target.value)} className="input w-full" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Emergency Contact Phone</label>
                <input value={emergencyContactPhone} onChange={(e) => setEmergencyContactPhone(e.target.value)} className="input w-full" />
              </div>

              <div className="md:col-span-2">
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
                  <h3 className="font-bold text-sm text-amber-900 mb-3">📋 TERMS & CONDITIONS</h3>
                  <div className="text-xs text-amber-900 space-y-2 leading-relaxed">
                    <p><strong>1. Late Arrival Policy:</strong> If you arrive more than 30 minutes after the normal class start time, we will NOT revise or go back over the practical session. You will simply wait for 30 minutes with no revision offered.</p>
                    <p><strong>2. Class Duration:</strong> The course is ONE MONTH and every single day matters. Failure to attend class does NOT add extra days to your course duration. You must complete the program within the scheduled timeframe.</p>
                    <p><strong>3. Late Payment Consequences:</strong> Late payment of fees is your own responsibility. You will bear all consequences of paying late, including possible class suspension.</p>
                    <p><strong>4. No Refunds:</strong> There are NO REFUNDS after payment has been made. Payment is final and non-refundable.</p>
                    <p><strong>5. Payment Required:</strong> NO PAYMENT = NO CLASS. You cannot attend class without paying the required fees.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <input type="checkbox" id="agree" checked={agreeToTerms} onChange={(e) => setAgreeToTerms(e.target.checked)} className="mt-1" />
                  <label htmlFor="agree" className="text-sm leading-relaxed">
                    I have read and agree to all the terms and conditions listed above. I understand that late arrival, class attendance, payment deadlines, and refund policies are strictly enforced. I take full responsibility for my actions and any consequences that may result.
                  </label>
                </div>
              </div>

              <div className="md:col-span-2 flex gap-4 mt-4">
                <Button 
                  type="submit" 
                  disabled={submitting}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded cursor-pointer"
                >
                  {submitting ? 'Submitting...' : 'Submit Application'}
                </Button>
                <Button 
                  variant="outline" 
                  type="button" 
                  onClick={() => {
                    setPassportFile(null);
                    setPassportPreview(null);
                    setFirstName(''); setMiddleName(''); setLastName(''); setEmail(''); setPhone(''); setAddress(''); setProgram('MERN Stack');
                    setStatement(''); setDateOfBirth(''); setGender('');
                    setNationalIdFile(null); setVotersIdFile(null); setTranscriptFile(null);
                    setParentGuardian(''); setGuardianPhone(''); setCompanyName('');
                    setSponsor('Self'); setAgreeToTerms(false);
                    setErrorMessage(''); setSuccessMessage('');
                  }}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-6 rounded cursor-pointer"
                >
                  Clear
                </Button>
              </div>
            </form>
          </div>
        </div>
      </Card3D>
    </section>
  );
}
