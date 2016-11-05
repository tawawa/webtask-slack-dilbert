/**
 * Simple Chat Bot that gets a link to to the daily Dilbert cartoon strip.
 *
 * Command `/wt dilbert <YYYY-MM-DD>
 *
 * Example commands:
 *
 * `/wt dilbert`
 * `/wt dilbert 2016-11-05`
 *
 * Example link format output with response:
 *
 * `http://dilbert.com/strip/2016-11-05`
 *
 */
module.exports = function (ctx, cb) {

  var createDateStrAsToday = function () {
    var dateObj = new Date(),
      year = dateObj.getUTCFullYear(),
      month = dateObj.getUTCMonth() + 1,
      day = ('' + dateObj.getUTCDate()).length === 1 ? '0' + dateObj.getUTCDate() : dateObj.getUTCDate();
    return year + "-" + month + "-" + day;
  };

  var parseDateStrFromWtCmd = function () {
    var dateRegex = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/g,
      text = ctx.body.text || '',
      commandWords = text.split(/\b(\s)/).filter(function (e) {
        return e.trim().length > 0;
      });
    return commandWords.length > 0 && dateRegex.test(commandWords[0]) ? commandWords[0] : null;
  };

  var prefix = 'http://dilbert.com/strip/';
  var dateStr = (parseDateStrFromWtCmd() !== null) ? parseDateStrFromWtCmd() : createDateStrAsToday();
  var dilbertLink = prefix + dateStr;

  cb(null, {
    response_type: 'in_channel', // comment out this line to make visible only to you..
    attachments: [
      {
        "title": "Dilbert for " + dateStr,
        "title_link": dilbertLink,
        "text": "Enjoy! Tip: To choose a different date use: /wt dilbert YYYY-MM-DD"
      }
    ]
  });
};