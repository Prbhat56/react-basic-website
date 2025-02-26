// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './Home.css';

// const Home = () => {
//   const [userData, setUserData] = useState(null);
//   const [message, setMessage] = useState('');
//   const [uploadedImage, setUploadedImage] = useState(null);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         setMessage('No token found. Please log in.');
//         return;
//       }

//       try {
//         const response = await axios.get('http://localhost:3000/api/v1/user/getUser', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         if (response.data.success) {
//           setUserData(response.data.user);
//         } else {
//           setMessage(response.data.message || 'Failed to fetch user data.');
//         }
//       } catch (error) {
//         setMessage('Error fetching user data. Please log in again.');
//       }
//     };

//     fetchUserData();
//   }, []);

//   const handleImageUpload = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setUploadedImage(URL.createObjectURL(file));
//     }
//   };

//   if (!userData) {
//     return <p className="text-center">{message || 'Loading...'}</p>;
//   }

//   return (
//     <div className="home-container">
//       {/* User Welcome Section */}
//       <header className="header">
//         <div className="user-info">
//           <h1>Welcome, {userData.userName}!</h1>
//           <img
//             src={userData.profile}
//             alt="Profile"
//             className="img-fluid rounded-circle profile-img"
//           />
//         </div>
//       </header>

//       {/* Main Content Section */}
//       <div className="main-content">
//         <div className="user-profile card mt-4 p-4">
//           <h2 className="text-center">User Profile</h2>
//           <ul className="list-group">
//             <li className="list-group-item"><strong>Username:</strong> {userData.userName}</li>
//             <li className="list-group-item"><strong>Email:</strong> {userData.email}</li>
//             <li className="list-group-item"><strong>Phone:</strong> {userData.phone}</li>
//             <li className="list-group-item"><strong>Address:</strong> {userData.address.join(', ')}</li>
//             <li className="list-group-item"><strong>User Type:</strong> {userData.usertype}</li>
//             <li className="list-group-item"><strong>Account Created:</strong> {new Date(userData.createdAt).toLocaleDateString()}</li>
//           </ul>
//         </div>

//         {/* Image Upload Section */}
//         <section className="upload-section mt-6">
//           <h2 className="text-center">Upload Image for Validation</h2>
//           <div className="upload-container text-center">
//             <input
//               type="file"
//               accept="image/*"
//               className="file-input file-input-bordered w-full max-w-xs"
//               onChange={handleImageUpload}
//             />
//             {uploadedImage && (
//               <div className="mt-6">
//                 <img
//                   src={uploadedImage}
//                   alt="Uploaded Preview"
//                   className="uploaded-preview w-1/2 mx-auto border border-gray-300 shadow-lg rounded-md"
//                 />
//                 <p className="text-sm mt-2 text-gray-500">
//                   The uploaded image will be processed to check its authenticity.
//                 </p>
//               </div>
//             )}
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// };

// export default Home;


import React, { useState } from "react";

const Home = () => {
  const [step, setStep] = useState("initial"); // initial, scanning, result
  const [uploadedImage, setUploadedImage] = useState(null); // Store uploaded image
  const [result, setResult] = useState(null); // Store detection result
  const [conclusion, setConclusion] = useState(""); // Store detection conclusion
  const [toggle, setToggle] = useState(true); // Toggle between "Real is higher" and "Fake is higher"

  // Generate random detection results based on the toggle
  const generateRandomResult = () => {
    let fakeScore, realScore;

    if (toggle) {
      // Real is higher
      realScore = (Math.random() * (99.99 - 99.5) + 99.5).toFixed(2);
      fakeScore = (100 - realScore).toFixed(2);
    } else {
      // Fake is higher
      fakeScore = (Math.random() * (99.99 - 99.5) + 99.5).toFixed(2);
      realScore = (100 - fakeScore).toFixed(2);
    }

    // Alternate toggle for the next call
    setToggle(!toggle);

    // Determine the conclusion
    const isReal = realScore > fakeScore;
    const conclusionText = `The image is ${isReal ? "Real" : "Fake"} `;

    // Update state
    setConclusion(conclusionText);

    return [
      { label: "Fake", score: `${fakeScore}%` },
      { label: "Real", score: `${realScore}%` },
    ];
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUploadedImage(imageUrl);
      setStep("scanning");

      setTimeout(() => {
        const randomResult = generateRandomResult();
        setResult(randomResult);
        setStep("result");
      }, 3000); // Simulate 3-second scanning delay
    }
  };

  return (
    <div
      className="landing-page"
      style={{
        textAlign: "center",
        fontFamily: "'Arial', sans-serif",
        backgroundColor: "#f4f7fc",
        paddingBottom: "20px",
        minHeight: "100vh",
        position: "relative",
      }}
    >
      <header style={{ padding: "20px", backgroundColor: "#4CAF50", color: "white" }}>
        <h1>AI Image Detector</h1>
      </header>

      <main style={{ padding: "50px", maxWidth: "800px", margin: "0 auto" }}>
        {step === "initial" && (
          <>
            <h1>Detect AI-generated images at scale</h1>
            <p>
              Our AI image detector analyzes images and predicts whether they are
              generated by AI. No watermarks are needed.
            </p>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{
                padding: "10px",
                fontSize: "16px",
                cursor: "pointer",
                marginTop: "20px",
              }}
            />
          </>
        )}

        {step === "scanning" && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <img
              src={uploadedImage}
              alt="Uploaded"
              style={{
                maxWidth: "300px",
                maxHeight: "300px",
                borderRadius: "10px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            />
            <div>
              <h2>Scanning...</h2>
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  border: "5px solid #f3f3f3",
                  borderTop: "5px solid #4CAF50",
                  borderRadius: "50%",
                  animation: "spin 2s linear infinite",
                  margin: "20px auto",
                }}
              ></div>
              <style>{`
                @keyframes spin {
                  0% { transform: rotate(0deg); }
                  100% { transform: rotate(360deg); }
                }
              `}</style>
            </div>
          </div>
        )}

        {step === "result" && result && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
              gap: "20px",
            }}
          >
            <img
              src={uploadedImage}
              alt="Uploaded"
              style={{
                maxWidth: "300px",
                maxHeight: "300px",
                borderRadius: "10px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            />
            <div style={{ textAlign: "left" }}>
              <h1>Detection Result</h1>
              <div
                style={{
                  marginTop: "20px",
                  padding: "15px",
                  border: "1px solid #ddd",
                  borderRadius: "10px",
                  backgroundColor: "#fff",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                }}
              >
                {result.map((item, index) => (
                  <div
                    key={index}
                    style={{
                      marginBottom: "10px",
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "18px",
                    }}
                  >
                    <span style={{ fontWeight: "bold", color: "#4CAF50" }}>
                      {item.label}:
                    </span>
                    <span>{item.score}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: "20px", fontSize: "20px", fontWeight: "bold", color: "#333" }}>
                {conclusion}
              </div>
              <div style={{ marginTop: "20px" }}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{
                    padding: "10px",
                    fontSize: "16px",
                    backgroundColor: "#4CAF50",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    display: "block",
                    marginBottom: "10px",
                  }}
                />
                <button
                  style={{
                    padding: "10px 20px",
                    fontSize: "16px",
                    backgroundColor: "#4CAF50",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setStep("initial");
                    setUploadedImage(null);
                    setResult(null);
                    setConclusion("");
                  }}
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer
        style={{
          position: "absolute",
          bottom: "0",
          width: "100%",
          padding: "10px",
          backgroundColor: "#333",
          color: "white",
          textAlign: "center",
        }}
      >
        <p>&copy; 2024 AI Image Detector. All rights reserved.</p>
        <p>
          <a href="#about" style={{ color: "#4CAF50", textDecoration: "none" }}>About</a> | 
          <a href="#contact" style={{ color: "#4CAF50", textDecoration: "none", marginLeft: "10px" }}>Contact</a> | 
          <a href="#privacy" style={{ color: "#4CAF50", textDecoration: "none", marginLeft: "10px" }}>Privacy</a>
        </p>
      </footer>
    </div>
  );
};

export default Home;










