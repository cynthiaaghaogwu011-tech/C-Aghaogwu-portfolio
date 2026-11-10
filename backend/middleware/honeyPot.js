// Blocks bots by checking a hidden form field that real visitors never fill in.
const honeyPot = (req, res, next) => {
    if (req.body.website) {
        // if a bot filled the hidden field. Pretend it worked so the bot doesn't retry.
        return res.status(200).json({ message: "Thanks, your message was sent." });
    }
    next();
};

module.exports = honeyPot;