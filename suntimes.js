var SIN = Math.sin;
var COS = Math.cos;
var SQR = Math.sqrt;
var ATN = Math.atan;
function SGN(num) {
    if (num < 0) return -1;
    if (num > 0) return +1;
    return 0;
}

setupConstants();
B5 = prompt('latitude (degrees)', '-37.47');
L5 = prompt('longitude (degrees)', '175.19');
H  = prompt('timezone (hrs west of Greenwich)', '-12');
L5 = L5/360; Z0 = H/24;
CalendarToJD(); T=(J-2451545)+F;
TT=T/36525+1 // TT = centuries from 1900.0
LST_at_0h_zone_time(); T=T+Z0;

Get_Suns_Position();

function Get_Suns_Position() {
    fundamental_arguments(); A_ARRAY[1]=A5; D_ARRAY[1]=D5;
    T=T+1;
    fundamental_arguments(); A_ARRAY[2]=A5; D_ARRAY[2]=D5;
    if (A_ARRAY[2]<A_ARRAY[1]) A_ARRAY[2]=A_ARRAY[2]+P2;
    Z1=DR*90.833; // Zenith dist.
    S=SIN(B5*DR); C=COS(B5*DR);
    Z=COS(Z1); M8=0; W8=0; alert('\n');
    A0=A_ARRAY[1]; D0=D_ARRAY[1];
    DA=A_ARRAY[2]-A_ARRAY[1]; DD=D_ARRAY[2]-D_ARRAY[1];
    for (C0=0; C0<=23; C0++) {
        P=(C0+1)/24;
        A2=A_ARRAY[1]+P*DA; D2=D_ARRAY[1]+P*DD;
        Test_an_hour_for_an_event();
        A0=A2; D0=D2; V0=V2;
    }
    Special_message_routine();
}

function LST_at_0h_zone_time() {
    T0=T/36525;
    S=24110.5+8640184.813*T0;
    S=S+86636.6*Z0+86400*L5;
    S=S/86400; S=S-Math.floor(S);
    T0=S*360*DR;
}

//bahahaha global variables ftw!
function setupConstants() {
    A_ARRAY = [ null, null, null ];
    D_ARRAY = [ null, null, null ];
    P1 = Math.PI; // pi
    P2 = Math.PI*2; //2 pi
    DR = P1/180; 
    K1 = 15 * DR * 1.0027379;
    S = "Sunset at ";
    R = "Sunrise at ";
    M = "No sunrise this date";
    M2 ="No sunset this date";
    M3 ="Sun down all day";
    M4 ="Sun up all day";
}

function LST_at_0h_zone_time() {
    T0=T/36525;
    S=24110.5+8640184.813*T0;
    S=S+86636.6*Z0+86400*L5;
    S=S/86400; S=S-Math.floor(S);
    T0=S*360*DR;
}

function Test_an_hour_for_an_event() {
    L0=T0+C0*K1; L2=L0+K1;
    H0=L0-A0; H2=L2-A2;
    H1=(H2+H0)/2; // Hour angle,
    D1=(D2+D0)/2; // declination,
                  // at half hour
    if (C0<=0) V0=S*SIN(D0)+C*COS(D0)*COS(H0)-Z;
    V2=S*SIN(D2)+C*COS(D2)*COS(H2)-Z;
    if (SGN(V0)==SGN(V2)) return;
    V1=S*SIN(D1)+C*COS(D1)*COS(H1)-Z
    A=2*V2-4*V1+2*V0; B=4*V1-3*V0-V2
    D=B*B-4*A*V0; if (D<0) return;
    D=SQR(D)
    if (V0<0 && V2>0) alert(R);
    if (V0<0 && V2>0) M8=1;
    if (V0>0 && V2<0) alert(S);
    if (V0>0 && V2<0) W8=1;
    E=(-B+D)/(2*A);
    if (E>1 || E<0) E=(-B-D)/(2*A);
    T3=C0+E+1/120; //Round off
    H3=Math.floor(T3); M3=Math.floor((T3-H3)*60);
    alert(H3+":"+M3);
    H7=H0+E*(H2-H0);
    N7=-COS(D1)*SIN(H7);
    D7=C*SIN(D1)-S*COS(D1)*COS(H7);
    AZ=ATN(N7/D7)/DR;
    if (D7<0)  AZ=AZ+180;
    if (AZ<0)  AZ=AZ+360;
    if (AZ>360) AZ=AZ-360;
    alert(", azimuth "+AZ);
}

function Special_message_routine() {
    if (M8==0 && W8==0) {
        if (V2<0)  alert(M3);
        if (V2>0)  alert(M4);
    } else {
        if (M8==0) alert(M1);
        if (W8==0) alert(M2);
    }
}

function fundamental_arguments() {
//     (Van Flandern & Pulkkinen, 1979)
    L=.779072+.00273790931*T;
    G=.993126+.0027377785*T;
    L=L-Math.floor(L); G=G-Math.floor(G);
    L=L*P2; G=G*P2;
    V=.39785*SIN(L);
    V=V-.01000*SIN(L-G);
    V=V+.00333*SIN(L+G);
    V=V-.00021*TT*SIN(L);
    U=1-.03349*COS(G);
    U=U-.00014*COS(2*L);
    U=U+.00008*COS(L);
    W=-.00010-.04129*SIN(2*L);
    W=W+.03211*SIN(G);
    W=W+.00104*SIN(2*L-G);
    W=W-.00035*SIN(2*L+G);
    W=W-.00008*TT*SIN(G);
    //    Compute Sun's RA and Dec
    S=W/SQR(U-V*V);
    A5=L+ATN(S/SQR(1-S*S));
    S=V/SQR(U);D5=ATN(S/SQR(1-S*S));
    R5=1.00021*SQR(U);
}

function CalendarToJD() {
    Y=parseInt(prompt('Year', (new Date().getFullYear())));
    M=parseInt(prompt('Month',(new Date().getMonth()))); 
    D=parseInt(prompt('Day', (new Date().getDay())));
    G=1; if (Y < 1583) G=0;
    D1=Math.floor(D); F=D-D1-.5;
    J=-Math.floor(7*(Math.floor((M+9)/12)+Y)/4);
    if (G==0) { unnamed(); return; }
    S=SGN(M-9); A=Math.abs(M-9);
    J3=Math.floor(Y+S*Math.floor(A/7));
    J3=-Math.floor((Math.floor(J3/100)+1)*3/4);
    unnamed();
}

function unnamed() {
    J=J+Math.floor(275*M/9)+D1+G*J3;
    J=J+1721027+2*G+367*Y;
    if (F >= 0) return;
    F=F+1; J=J-1;
}

//  this program by roger w. sinnott calculates the times of sunrise
//  and sunset on any date, accurate to the minute within several
//  centuries of the present.  it correctly describes what happens in the 
//  arctic and antarctic regions, where the sun may not rise or set on
//  a given date.  enter north latitudes positive, west longitudes
//  negative.  for the time zone, enter the number of hours west of
//  greenwich (e.g., 5 for est, 4 for edt).  the calculation is
//  discussed in sky & telescope for august 1994, page 84.
//
//  translated to javascript by Mark Hansen 2010
