$(document).ready(function () {
  const playerIDs = [ "player-1", "player-2", "player-3", "player-4", "player-5" ];
  const aIDs = ["firstTab", "secondTab", "thirdTab", "forthTab", "fifthTab"];
  const videoIDs = [ "M6joZsJpXWM", "c6pgR4yEYVE", "YD5Qeo6o1UI", "Uj90lnAjbw0", "TT-N5wl0l-s" ];
  const accordionIDs = [
    ["title1", "author1", "playerID1", "duration1"],
    ["title2", "author2", "playerID2", "duration2"],
    ["title3", "author3", "playerID3", "duration3"],
    ["title4", "author4", "playerID4", "duration4"],
    ["title5", "author5", "playerID5", "duration5"]
  ];
  let player;

  $(function () {
    $("#tabs").tabs({ collapsible: true  });
    $("#accordion1").accordion({ collapsible: true});
    $("#accordion2").accordion({ collapsible: true});
    $("#accordion3").accordion({ collapsible: true});
    $("#accordion4").accordion({ collapsible: true});
    $("#accordion5").accordion({ collapsible: true});

    $("#tabs").click(addVideo);
  });

  function addVideo(eventReceived) {
    let event;
    let tabNumber;
    
    for(let i=0; i<=4; i++) {
      if(eventReceived.target.id === aIDs[i]) {
        if (player) {
          player.destroy();
        }
        event = playerIDs[i];
        tabNumber = i;
      }
    }
    if (event) {
      player = new YT.Player(event), {
        height: '360',
        width: '640',
        videoID: videoIDs[tabNumber],
        events: {
          'onReady': onPlayerReady
        }
      }
    }

    function onPlayerReady(_event) {
      _event.target.playVideo();
      let duration = player.getDuration();
      console.log(duration);
      let completeData = player.getVideoData();
      let linkVideo = player.getVideoURL();
  
      for (let i=0; i<=4; i++) {
        if(event === playerIDs[i]) {
          $(aIDs[i]).html(completeData.title)
          $(accordionIDs[i][0]).html(completeData.title);
          $(accordionIDs[i][1]).html(completeData.author);
          $(accordionIDs[i][2]).html(completeData.video_id)
          $(accordionIDs[i][3]).html(duration);
        }
      }
    }
  };

});
