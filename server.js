var express = require('express');
var app = express();
var cors = require('cors'); // Import the cors middleware



var mysql = require('mysql');
var bodyParser = require('body-parser');
var ExcelJS = require('exceljs'); // Import exceljs library for Excel manipulation
var fs = require('fs');
var path = require('path');


app.use(bodyParser.json({ type: 'application/json' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors()); // Enable CORS for all routes


var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ski'
});

var server = app.listen(9091, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Server started at http://%s:%s", host, port);
});

con.connect(function (error) {
    if (error) console.log(error);
    else console.log("Connected to MySQL database");
});




// Endpoint to handle downloading Excel file
app.get('/download-excel', async function (req, res) {
    try {
        // Fetch data from MySQL to generate Excel
        con.query('SELECT * FROM budget', function (error, results) {
            if (error) {
                console.error('Error fetching budget data:', error);
                res.status(500).json({ success: false, message: "Failed to fetch budget data" });
            } else {
                // Create a workbook and add a worksheet
                var workbook = new ExcelJS.Workbook();
                var worksheet = workbook.addWorksheet('Budget');

                // Define columns in Excel
                worksheet.columns = [
                    { header: 'SNo', key: 'SNo', width: 10 },
                    { header: 'Selected College', key: 'selectedCollege', width: 20 },
                    { header: 'Date From', key: 'dateFrom', width: 15 },
                    // Add more headers as per your database columns
                    // Example: { header: 'Date To', key: 'dateTo', width: 15 },
                    //         { header: 'Selected Departments', key: 'selectedDepartments', width: 20 },
                    //         ...
                ];

                // Add data rows from MySQL results
                results.forEach(function (row) {
                    worksheet.addRow(row);
                });

                // Generate a unique filename
                var filename = `budget-${Date.now()}.xlsx`;
                var filePath = path.join(__dirname, 'public', filename);

                // Save workbook to file
                workbook.xlsx.writeFile(filePath).then(function () {
                    console.log("Excel file generated:", filename);
                    
                    // Send the file as a response
                    res.setHeader('Content-Disposition',`attachment; filename=${filename}`);
                    res.sendFile(filePath);
                });
            }
        });
    } catch (error) {
        console.error('Error generating Excel file:', error);
        res.status(500).json({ success: false, message: "Failed to generate Excel file" });
    }
});

// Your existing endpoints and other code continue below...
// Endpoint to handle POST requests for inserting data into 'budget' table
app.post('/budget', function (req, res) {
    // Extract data from request body
    var { selectedCollege, dateFrom, dateTo, selectedDepartments, selectedTimeFrom, selectedTimeTo, duration, selectedActivityType, selectedActivityAffiliation, eventTitle, resource, academicYearSelections, departmentSelections, selectedVenue, budget, totalBudget, facultyName, facultyNumber, comment,status } = req.body;
    console.log('Received data:', req.body); // Log received data

// Prepare comma-separated strings for equipment items
var particulars = budget.map(item => item.particulars || '').join(',');
var amount = budget.map(item => item.amount || '').join(',');


    // Construct SQL query for insert
    var resourceName = resource.map(item => item.resourceName || '').join(',');
    var designation = resource.map(item => item.designation || '').join(',');
    var companyDetails = resource.map(item => item.companyDetails || '').join(',');
    var contactNumber = resource.map(item => item.contactNumber || '').join(',');

    var insertQuery = `INSERT INTO budget (selectedCollege, dateFrom, dateTo, selectedDepartments, selectedTimeFrom, selectedTimeTo, duration, selectedActivityType, selectedActivityAffiliation, eventTitle, resourceName, designation, companyDetails, contactNumber, academicYearSelections, departmentSelections, selectedVenue, particulars, amount, totalBudget, facultyName, facultyNumber, comment, status) VALUES ?`;

         // Prepare comma-separated strings for equipment items
 
    // Convert arrays to strings
    // Convert arrays to strings
    var academicYearSelections = academicYearSelections.join(',');
    var departmentSelections = departmentSelections.join(',');

  // Execute the insert query
  var values = [[selectedCollege, dateFrom, dateTo, selectedDepartments, selectedTimeFrom, selectedTimeTo, duration, selectedActivityType, selectedActivityAffiliation, eventTitle, resourceName, designation, companyDetails, contactNumber, academicYearSelections, departmentSelections, selectedVenue, particulars, amount, totalBudget, facultyName, facultyNumber, comment, status]];

con.query(insertQuery, [values], function (error, result) {
    if (error) {
        console.log("Error inserting data:", error);
        res.status(500).json({ success: false, message: "Failed to insert data" });
    } else {
        console.log("Data inserted successfully");
        res.status(200).json({ success: true, message: "Data inserted successfully" });
    }
});
});

    

//faculty budget


app.post('/faculty', function (req, res) {
    // Extract data from request body
    var { selectedCollege, dateFrom, dateTo, faculty, selectedTimeFrom, selectedTimeTo, duration, selectedActivityType, eventName, instituteName, location, budgetRequested,status,managementComments  } = req.body;

    console.log('Received data:', req.body); // Log received data
    // Construct SQL query for insert
    var facultyName = faculty.map(item => item.facultyName || '').join(',');
    var designation = faculty.map(item => item.designation || '').join(',');
    var departmentSelections = faculty.map(item => item.departmentSelections || '').join(',');

    var insertQuery = `INSERT INTO faculty (selectedCollege, dateFrom, dateTo, facultyName, designation, departmentSelections, selectedTimeFrom, selectedTimeTo, duration, selectedActivityType, eventName, instituteName, location, budgetRequested,status,managementComments)  VALUES ?`;

     // Prepare comma-separated strings for equipment items
     var values = [[selectedCollege, dateFrom, dateTo, facultyName, designation, departmentSelections, selectedTimeFrom, selectedTimeTo, duration, selectedActivityType, eventName, instituteName, location, budgetRequested,status,managementComments]];

    // Execute the insert query
    con.query(insertQuery, [values], function (error, result) {
        if (error) {
            console.log("Error inserting data:", error);
            res.status(500).json({ success: false, message: "Failed to insert data" });
        } else {
            console.log("Data inserted successfully");
            res.status(200).json({ success: true, message: "Data inserted successfully" });
        }
    });
});



//student budget



app.post('/student', function (req, res) {
    // Extract data from request body
    var {selectedCollege, dateFrom, dateTo, student, selectedTimeFrom, selectedTimeTo, duration, selectedActivityType, eventName, instituteName, location, budgetRequested,facultySupport, status, managementComments} = req.body;
    console.log('Received data:', req.body); // Log received data
    
    // Construct SQL query for insert
    var studentName = student.map(item => item.studentName || '').join(',');
    var departmentSelections = student.map(item => item.departmentSelections || '').join(',');
    var academicYear = student.map(item => item.academicYear || '').join(',');

    var facultyName = facultySupport.map(item => item.facultyName || '').join(',');
    var department = facultySupport.map(item => item.department || '').join(',');
    var facultyBudget = facultySupport.map(item => item.facultyBudget || '').join(',');


    var insertQuery = `INSERT INTO student (selectedCollege, dateFrom, dateTo, studentName, departmentSelections, academicYear, selectedTimeFrom, selectedTimeTo, duration, selectedActivityType, eventName, instituteName, location, budgetRequested,facultyName, department, facultyBudget, status, managementComments) VALUES?;
       // Prepare comma-separated strings for equipment items
       var values = [[selectedCollege, dateFrom, dateTo, studentName, departmentSelections, academicYear, selectedTimeFrom, selectedTimeTo, duration, selectedActivityType, eventName, instituteName, location, budgetRequested,facultyName, department, facultyBudget, status, managementComments]]`;

    
    // Execute the insert query
    con.query(insertQuery, [values], function (error, result) {
        if (error) {
            console.log("Error inserting data:", error);
            res.status(500).json({ success: false, message: "Failed to insert data" });
        } else {
            console.log("Data inserted successfully");
            res.status(200).json({ success: true, message: "Data inserted successfully" });
        }
    });
});


//equipment form

app.post('/equipment', function (req, res) {
    // Extract data from request body
    var { selectedCollege, facultyName, selectedDepartments, dateOfPurchase, category, equipment, totalCost, comment, status, managementComments  } = req.body;
    console.log('Received data:', req.body); // Log received data

    // Prepare comma-separated strings for equipment items
    var equipmentList = equipment.map(item => item.equipmentList || '').join(',');
    var specification = equipment.map(item => item.specification || '').join(',');
    var unitPrice = equipment.map(item => item.unitPrice || '').join(',');
    var quantity = equipment.map(item => item.quantity || '').join(',');
    var cost = equipment.map(item => item.cost || '').join(',');

    // Construct SQL query for insert
    var insertQuery =`INSERT INTO equipment (selectedCollege, facultyName, selectedDepartments, dateOfPurchase, category, equipmentList, specification, unitPrice, quantity, cost, totalCost, comment,status, managementComments) VALUES ?;

    // Prepare the data to be inserted
    var values = [[selectedCollege, facultyName, selectedDepartments, dateOfPurchase, category, equipmentList, specification, unitPrice, quantity, cost, totalCost, comment,status, managementComments]]`;

    // Execute the insert query
    con.query(insertQuery, [values], function (error, result) {
        if (error) {
            console.log("Error inserting data:", error);
            res.status(500).json({ success: false, message: "Failed to insert data" });
        } else {
            console.log("Data inserted successfully");
            res.status(200).json({ success: true, message: "Data inserted successfully" });
        }
    });
});


//login



// Endpoint to handle POST requests for user login
app.post('/signin', function (req, res) {
    // Extract username and password from request body
    const {username, password } = req.body;

    // Construct SQL query to find user by username and password
    const query = `SELECT * FROM signin WHERE username = '${username}' AND password = '${password}'`;

    // Execute the query
    con.query(query, function (error, results) {
        if (error) {
            console.log("Error querying database:", error);
            res.status(500).json({ success: false, message: "Internal server error" });
        } else {
            if (results.length > 0) {
                // Principal found, retrieve college name
                const college = results[0].college;
                // Send success response along with college name
                res.status(200).json({ success: true, message: "Login successful", college });
            } else {
                // User not found or invalid credentials, send error response
                res.status(401).json({ success: false, message: "Invalid username or password" });
            }
        }
    });
});




//
app.get('/budget', function (req, res) {
    con.query('SELECT * FROM budget', function (error, results) {
      if (error) {
        console.error('Error fetching form data:', error);
        res.status(500).json({ success: false, message: "Failed to fetch form data" });
      } else {
        res.status(200).json(results);
      }
    });
  });


  // Update the '/updateBudget' endpoint in your Express app
  app.post('/updateBudget', function (req, res) {
    var updatedData = req.body;
    console.log('Updated data:', updatedData);

    // Set returnedit to 1 if status is "Return"
    var returneditValue = updatedData.status === 'Return' ? 1 : 0;
    var updateQuery = `
        UPDATE budget
        SET dateFrom = '${updatedData.dateFrom}',
            dateTo = '${updatedData.dateTo}',
            selectedDepartments = '${updatedData.selectedDepartments}',
            selectedTimeFrom = '${updatedData.selectedTimeFrom}',
            selectedTimeTo = '${updatedData.selectedTimeTo}',
            duration = '${updatedData.duration}',
            selectedActivityType = '${updatedData.selectedActivityType}',
            selectedActivityAffiliation = '${updatedData.selectedActivityAffiliation}',
            eventTitle = '${updatedData.eventTitle}',
            resourceName = '${updatedData.resourceName}',
            designation = '${updatedData.designation}',
            companyDetails = '${updatedData.companyDetails}',
            contactNumber = '${updatedData.contactNumber}',
            academicYearSelections = '${updatedData.academicYearSelections}',
            departmentSelections = '${updatedData.departmentSelections}',
            selectedVenue = '${updatedData.selectedVenue}',
            totalBudget = '${updatedData.totalBudget}',
            facultyName = '${updatedData.facultyName}',
            facultyNumber = '${updatedData.facultyNumber}',
            comment = '${updatedData.comment}',
            status = '${updatedData.status}',
            managementComments = '${updatedData.managementComments}',
   returnedit = CASE 
                WHEN '${updatedData.status}' = 'Return' THEN 1 
                ELSE returnedit 
            END
            WHERE SNo = '${updatedData.SNo}'

    `;

    con.query(updateQuery, function (error, result) {
        if (error) {
            console.log("Error updating data:", error);
            res.status(500).json({ success: false, message: "Failed to update data" });
        } else {
            console.log("Data updated successfully");
            res.status(200).json({ success: true, message: "Data updated successfully" });
        }
    });
});


app.post('/updateBudgets', function (req, res) {
    var updatedData = req.body;
    console.log('Updated data:', updatedData);

    // Set returnedit to 1 if status is "Return"

    var updateQuery = `
        UPDATE budget
        SET dateFrom = '${updatedData.dateFrom}',
            dateTo = '${updatedData.dateTo}',
            selectedDepartments = '${updatedData.selectedDepartments}',
            selectedTimeFrom = '${updatedData.selectedTimeFrom}',
            selectedTimeTo = '${updatedData.selectedTimeTo}',
            duration = '${updatedData.duration}',
            selectedActivityType = '${updatedData.selectedActivityType}',
            selectedActivityAffiliation = '${updatedData.selectedActivityAffiliation}',
            eventTitle = '${updatedData.eventTitle}',
            resourceName = '${updatedData.resourceName}',
            designation = '${updatedData.designation}',
            companyDetails = '${updatedData.companyDetails}',
            contactNumber = '${updatedData.contactNumber}',
            academicYearSelections = '${updatedData.academicYearSelections}',
            departmentSelections = '${updatedData.departmentSelections}',
            selectedVenue = '${updatedData.selectedVenue}',
            totalBudget = '${updatedData.totalBudget}',
            facultyName = '${updatedData.facultyName}',
            facultyNumber = '${updatedData.facultyNumber}',
            comment = '${updatedData.comment}',
            status = '${updatedData.status}',
            managementComments = '${updatedData.managementComments}'

            WHERE SNo = '${updatedData.SNo}'

    `;

    con.query(updateQuery, function (error, result) {
        if (error) {
            console.log("Error updating data:", error);
            res.status(500).json({ success: false, message: "Failed to update data" });
        } else {
            console.log("Data updated successfully");
            res.status(200).json({ success: true, message: "Data updated successfully" });
        }
    });
});
///



app.delete('/deleteBudget/:SNo', function (req, res) {
    const SNo = req.params.SNo;

    const deleteQuery = `DELETE FROM budget WHERE SNo = '${SNo}'`;

    con.query(deleteQuery, function (error, result) {
        if (error) {
            console.log("Error deleting data:", error);
            res.status(500).json({ success: false, message: "Failed to delete data" });
        } else {
            console.log("Data deleted successfully");
            res.status(200).json({ success: true, message: "Data deleted successfully" });
        }
    });
});





//// faculty budget
app.get('/faculty', function (req, res) {
    con.query('SELECT * FROM faculty', function (error, results) {
        if (error) {
            console.error('Error fetching faculty data:', error);
            res.status(500).json({ success: false, message: "Failed to fetch faculty data" });
        } else {
            res.status(200).json(results);
        }
    });
});


app.post('/updateFacultyBudget', function (req, res) {
    var updatedData = req.body;
    console.log('Updated faculty budget data:', updatedData);

    var updateQuery = `
        UPDATE faculty
        SET dateFrom = '${updatedData.dateFrom}',
            dateTo = '${updatedData.dateTo}',
            facultyName = '${updatedData.facultyName}',
            designastion = '${updatedData.designation}',
            departmentSelections = '${updatedData.departmentSelections}',
            selectedTimeFrom = '${updatedData.selectedTimeFrom}',
            selectedTimeTo = '${updatedData.selectedTimeTo}',
            duration = '${updatedData.duration}',
            selectedActivityType = '${updatedData.selectedActivityType}',
            eventName = '${updatedData.eventName}',
            instituteName = '${updatedData.instituteName}',
            location = '${updatedData.location}',
            budgetRequested = '${updatedData.budgetRequested}',
            status = '${updatedData.status}',
            managementComments = '${updatedData.managementComments}'

            WHERE SNo = '${updatedData.SNo}'
    `;

    con.query(updateQuery, function (error, result) {
        if (error) {
            console.log("Error updating faculty budget data:", error);
            res.status(500).json({ success: false, message: "Failed to update faculty budget data" });
        } else {
            console.log("Faculty budget data updated successfully");
            res.status(200).json({ success: true, message: "Faculty budget data updated successfully" });
        }
    });
});



app.delete('/deleteFacultyBudget/:SNo', function (req, res)  {
    const SNo = req.params.SNo;
    const deleteQuery =` DELETE FROM faculty WHERE SNo = '${SNo}'`;

    con.query(deleteQuery, [SNo], (error, result) => {
        if (error) {
            console.error("Error deleting faculty budget data:", error);
            res.status(500).json({ success: false, message: "Failed to delete faculty budget data" });
        } else {
            console.log("Faculty budget data deleted successfully");
            res.status(200).json({ success: true, message: "Faculty budget data deleted successfully" });
        }
    });
});



///studentbudget

app.get('/student', function (req, res) {
    con.query('SELECT * FROM student', function (error, results) {
        if (error) {
            console.error('Error fetching student data:', error);
            res.status(500).json({ success: false, message: "Failed to fetch student data" });
        } else {
            res.status(200).json(results);
        }
    });
});

// Update student budget data
app.post('/updateStudentBudget', function (req, res) {
    var updatedData = req.body;
    console.log('Updated student budget data:', updatedData);

    var updateQuery = `
        UPDATE student
        SET dateFrom = '${updatedData.dateFrom}',
            dateTo = '${updatedData.dateTo}',
            studentName = '${updatedData.studentName}',
            departmentSelections = '${updatedData.departmentSelections}',
            academicYear = '${updatedData.academicYear}',
            selectedTimeFrom = '${updatedData.selectedTimeFrom}',
            selectedTimeTo = '${updatedData.selectedTimeTo}',
            duration = '${updatedData.duration}',
            selectedActivityType = '${updatedData.selectedActivityType}',
            eventName = '${updatedData.eventName}',
            instituteName = '${updatedData.instituteName}',
            location = '${updatedData.location}',
            budgetRequested = '${updatedData.budgetRequested}',
            facultyName = '${updatedData.facultyName}',
            department = '${updatedData.department}',
            facultyBudget = '${updatedData.facultyBudget}',
            status = '${updatedData.status}',
            managementComments = '${updatedData.managementComments}'


            WHERE SNo = '${updatedData.SNo}'
    `;

    con.query(updateQuery, function (error, result) {
        if (error) {
            console.log("Error updating student budget data:", error);
            res.status(500).json({ success: false, message: "Failed to update student budget data" });
        } else {
            console.log("Student budget data updated successfully");
            res.status(200).json({ success: true, message: "Student budget data updated successfully" });
        }
    });
});

// Delete student budget data
app.delete('/deleteStudentBudget/:SNo', function (req, res)  {
    const SNo = req.params.SNo;
    const deleteQuery = `DELETE FROM student WHERE SNo = '${SNo}'`;

    con.query(deleteQuery, [SNo], (error, result) => {
        if (error) {
            console.error("Error deleting student budget data:", error);
            res.status(500).json({ success: false, message: "Failed to delete student budget data" });
        } else {
            console.log("Student budget data deleted successfully");
            res.status(200).json({ success: true, message: "Student budget data deleted successfully" });
        }
    });
});


// equipment budget


app.get('/equipment', function (req, res) {
    con.query('SELECT * FROM equipment', function (error, results) {
        if (error) {
            console.error('Error fetching equipment data:', error);
            res.status(500).json({ success: false, message: "Failed to fetch equipment data" });
        } else {
            res.status(200).json(results);
        }
    });
});

// Update equipment data
app.post('/updateEquipmentBudget', function (req, res) {
    var updatedData = req.body;
    console.log('Updated equipment data:', updatedData);

    var updateQuery = `
        UPDATE equipment
        SET selectedCollege = '${updatedData.selectedCollege}',
            facultyName = '${updatedData.facultyName}',
            selectedDepartments = '${updatedData.selectedDepartments}',
            dateOfPurchase = '${updatedData.dateOfPurchase}',
            category = '${updatedData.category}',
            totalCost = '${updatedData.totalCost}',
            comment = '${updatedData.comment}',
            status = '${updatedData.status}',
            managementComments = '${updatedData.managementComments}'

            WHERE SNo = '${updatedData.SNo}'
    `;

    con.query(updateQuery, function (error, result) {
        if (error) {
            console.log("Error updating equipment data:", error);
            res.status(500).json({ success: false, message: "Failed to update equipment data" });
        } else {
            console.log("Equipment data updated successfully");
            res.status(200).json({ success: true, message: "Equipment data updated successfully" });
        }
    });
});

// Delete equipment data
app.delete('/deleteEquipmentBudget/:SNo', function (req, res)  {
    const SNo = req.params.SNo;
    const deleteQuery = `DELETE FROM equipment WHERE SNo = '${SNo}'`;

    con.query(deleteQuery, [SNo], (error, result) => {
        if (error) {
            console.error("Error deleting equipment data:", error);
            res.status(500).json({ success: false, message: "Failed to delete equipment data" });
        } else {
            console.log("Equipment data deleted successfully");
            res.status(200).json({ success: true, message: "Equipment data deleted successfully" });
        }
    });
});
