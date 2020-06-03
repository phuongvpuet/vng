var GLOBAL = {};

GLOBAL.STATE_GAME_PLAYING = 0;
GLOBAL.STATE_GAME_OVER = 1;
GLOBAL.SCREEN_WIDTH = 288;
GLOBAL.SCREEN_HEIGHT = 512;
GLOBAL.GAP = 100;
GLOBAL.VELOCITY = 1.5;

var audioEngine = cc.AudioEngine.getInstance();
audioEngine.preloadEffect(res.flapMusicDie);
audioEngine.preloadEffect(res.flapMusicHit);
audioEngine.preloadEffect(res.flapMusicPoint);
audioEngine.preloadEffect(res.flapMusicSwoosh);
audioEngine.preloadEffect(res.flapMusicWing);