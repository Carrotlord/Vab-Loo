/** Constructs a new SuperClock. */
            function drawClock() {
                canvas = new SuperClock("overclocked", 200, 200);
                var clock = canvas.circle(100, 100, 95);
                clock.attr(
                    {
                        "fill": "#dcdcdc",
                        "stroke": "#5e9fa0",
                        "stroke-width": 5
                    }
                );
                var hourSign = undefined;
                for (var i = 0; i < 12; ++i) {
                    var startX = 100 + Math.round(80 * Math.cos(30 * i * Math.PI/180));
                    var startY = 100 + Math.round(80 * Math.sin(30 * i * Math.PI/180));
                    var endX = 100 + Math.round(90 * Math.cos(30 * i * Math.PI/180));
                    var endY = 100 + Math.round(90 * Math.sin(30 * i * Math.PI/180));
                    hourSign = canvas.path("M" + startX + " " + startY + "L" + endX + " " + endY);
                }
                hourHand = canvas.path("M100 100L100 50");
                hourHand.attr({stroke: "#2f4f4f", "stroke-width": 6});
                minuteHand = canvas.path("M100 100L100 40");
                minuteHand.attr({stroke: "#2f4f4f", "stroke-width": 4});
                secondHand = canvas.path("M100 110L100 25");
                secondHand.attr({stroke: "#444444", "stroke-width": 2});
                var marker = canvas.circle(100, 100, 5);
                marker.attr("fill", "#2f4f4f");
                /* Begin updating the clock. */
                updateClockForever();
            }

            /** Updates the SuperClock. */
            function updateClockForever() {
                /*
                 * We use the real time every update,
                 * instead of approximating it with
                 * window.setTimeout(func, time, [args...])'s
                 * inaccurate millisecond timer.
                 */
                var now = new Date();
                var hours = now.getHours();
                var minutes = now.getMinutes();
                var seconds = now.getSeconds();
                hourHand.rotate(30 * hours + (minutes / 2.5), 100, 100);
                minuteHand.rotate(6 * minutes, 100, 100);
                secondHand.rotate(6 * seconds, 100, 100);
                window.setTimeout(updateClockForever, 1000);
            }
