/*******************************************************
 * Tiercé de la Danse
 * Google Apps Script
 *******************************************************/

const SHEET_NAME = "Participations";

/*******************************************************
 * GET
 *******************************************************/
function doGet(e) {

  return ContentService
    .createTextOutput(
      JSON.stringify({
        success: true,
        message: "API Tiercé de la Danse active"
      })
    )
    .setMimeType(ContentService.MimeType.JSON);

}

/*******************************************************
 * POST
 *******************************************************/
function doPost(e) {

  try {

    const data = JSON.parse(e.postData.contents);

    const sheet = SpreadsheetApp
      .getActiveSpreadsheet()
      .getSheetByName(SHEET_NAME);

    if (!sheet) {

      throw new Error("Feuille Participations introuvable.");

    }

    const ligne = [

      new Date(),

      data.nom,

      data.prenom,

      data.emplacement,

      data.positions[0],
      data.positions[1],
      data.positions[2],
      data.positions[3],
      data.positions[4],
      data.positions[5],
      data.positions[6],
      data.positions[7],
      data.positions[8],
      data.positions[9]

    ];

    sheet.appendRow(ligne);

    return ContentService
      .createTextOutput(
        JSON.stringify({
          success: true
        })
      )
      .setMimeType(ContentService.MimeType.JSON);

  }

  catch (err) {

    return ContentService
      .createTextOutput(
        JSON.stringify({

          success: false,

          message: err.toString()

        })
      )
      .setMimeType(ContentService.MimeType.JSON);

  }

}
