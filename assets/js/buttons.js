////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                            // 
//      Button Management Instructions                                                        // 
//                                                                                            // 
//      To add a button with a new tab target,                                                // 
//      Step 1 : Copy the entire button object (including the curly brackets and comma)       // 
//                  Example:    {                                                             // 
//                      label: "Your Button Label Here",                                      // 
//                      url: "https://example.com/",                                          // 
//                      id: "unique_button_id",                                               // 
//                      img: "assets/img/image.png",                                          // 
//                      category: "Category Name",                                            // 
//                      target: "_blank"                                                      // 
//                  },                                                                        // 
//      Step 2 : Paste it after the last button object in the buttons array,                  // 
//                  making sure to place a comma after the previous object if necessary.      // 
//      Step 3 : Change the label, url, id, img, category, and target according to the new    // 
//                  button requirements.                                                      // 
//      Step 4 : Ensure that the label, url, id, and category are unique.                     // 
//      Step 5 : Commit and Push the changes to GitHub.                                       // 
//                                                                                            // 
//      To remove a button,                                                                   // 
//      Step 1 : Locate the button object you want to remove in the buttons array.            // 
//      Step 2 : Copy the entire object (including the curly brackets and comma).             // 
//                  Example:    {                                                             // 
//                      label: "Button to Remove",                                            // 
//                      url: "https://example.com/",                                          // 
//                      id: "remove_button_id",                                               // 
//                      img: "assets/img/remove.png",                                         // 
//                      category: "Removal Category",                                         // 
//                      target: "_blank"                                                      // 
//                  },                                                                        // 
//      Step 3 : Delete it from the array.                                                    // 
//      Step 4 : Commit and Push the changes to GitHub.                                       // 
//                                                                                            // 
//      To hide a button,                                                                     // 
//      Step 1 : Locate the button object you want to hide in the buttons array.              // 
//      Step 2 : Add a 'hidden' property to the button object, setting it to 'true'.          // 
//                  Example:    {                                                             // 
//                      label: "Hidden Button",                                               // 
//                      url: "https://example.com/",                                          // 
//                      id: "hidden_button_id",                                               // 
//                      img: "assets/img/hidden.png",                                         // 
//                      category: "Hidden Category",                                          // 
//                      target: "_blank",                                                     // 
//                      hidden: true                                                          // 
//                  },                                                                        // 
//      Step 3 : Commit and Push the changes to GitHub.                                       // 
//                                                                                            // 
////////////////////////////////////////////////////////////////////////////////////////////////

// Array of buttons with categories, unique IDs, labels, and images
const buttons = [
    {
        label: "QR Code Generator",
        url: "qr-code-generator",
        id: "qr-code-generator",
        img: "qr-code-generator.svg",
        category: "Code Generators"
    },
    {
        label: "Bar Code Generator",
        url: "bar-code-generator",
        id: "bar-code-generator",
        img: "bar-code-generator.svg",
        category: "Code Generators"
    },
    {
        label: "Data Matrix Generator",
        url: "data-matrix-generator",
        id: "data-matrix-generator",
        img: "data-matrix-generator.svg",
        category: "Code Generators"
    },

    // Add more buttons here, each with a unique id, label, img, and category...
];
