# -*- coding: utf-8 -*-
"""
Created on Fri Dec 25 09:42:02 2020

@author: ah920
"""

# -*- coding: utf-8 -*-
"""
Created on Thu Dec 24 21:45:30 2020

@author: ah920
"""

import numpy as np
import matplotlib.pyplot as plt
from scipy.integrate import solve_ivp
from scipy import constants as CONSTANTS
from matplotlib.patches import Circle

M_EARTH = 5.972E24     # Mass of the earth (kg)
R_EARTH = 6.371E6      # Radius of the earth (m)


AU = CONSTANTS.astronomical_unit
PI = CONSTANTS.pi
G = CONSTANTS.gravitational_constant
YEAR = CONSTANTS.year
DAY = CONSTANTS.day
R0=np.array([3*PI/4,1000.0 * R_EARTH,- 1000.0, 13.0])


t_eval = np.linspace(0.0, 100.0 * DAY, 1000000)

#uptade function according to Newton's Law of Gravity
def NewtonsLaw(t,X):
    x,y,vx,vy=X
    ax=-G*M_EARTH*x/(x**2+y**2)**(3/2)
    ay=-G*M_EARTH*y/(x**2+y**2)**(3/2)
    return [vx,vy,ax,ay]
#transform coordinates from polar to cartesian
def coordtransform(R):
    theta,r,vr,vt=R
    x=r*np.cos(theta)
    y=r*np.sin(theta)
    vx=vr*np.cos(theta)-vt*np.sin(theta)
    vy=vr*np.sin(theta)+vt*np.cos(theta)
    return np.array([x,y,vx,vy])
X0=coordtransform(R0)

solution=solve_ivp(NewtonsLaw, [0.0,t_eval[-1]], X0,method='Radau', t_eval=t_eval )
x,y,vx,vy=solution.y

fig, ax =plt.subplots(1,2)

for a in ax:

    earth = Circle((0.0, 0.0), radius=1.0, facecolor='w', edgecolor='b', label='Earth')
    a.add_artist(earth)
    a.plot(x / R_EARTH, y / R_EARTH, label='Asteroid Trajectory', color='k', alpha=1.0)
    a.plot([0.0, x[np.argmin(np.hypot(x, y))]/ R_EARTH], [0.0, y[np.argmin(np.hypot(x, y))]/ R_EARTH], 'k:', label='Closest Approach')
    a.axhline(0.0, linewidth=0.5, alpha=0.5, color='k')
    a.axvline(0.0, linewidth=0.5, alpha=0.5, color='k')
    a.set(xlim=[-5, 5], ylim=[-5, 5], 
          xlabel='$x\,/\,R_\mathrm{E}$', ylabel='$y\,/\,R_\mathrm{E}$')

ax[1].legend()
ax[0].set(xlim=[-50, 50], ylim=[-50, 50])
    
fig.set_size_inches(12, 6)
fig.tight_layout()
plt.show()


#vrem sa scriem ca o functie liniara pentru a afla prop elipsei ie y**2=b**2-b**2*x**2/a**2
#vrem sa mutam elipsa in centrul axelor de coordonate fiindca momentan originea se afla in focar ie soare

# v=y**2
# u=(x-x[np.argmax(y)])**2
# f,cov=np.polyfit(u,v,1,cov=True)
# b=np.sqrt(f[1])/AU
# a=np.sqrt(-f[1]/f[0])/AU

# # Plot the orbit
# fig, ax = plt.subplots(figsize=[6, 6])
# ax.plot(x / AU, y / AU, label='Orbit Trajectory')

# # Add the semi-minor/major axes as a check
# ax.plot([x.max() / AU - a, x.max() / AU], [0.0, 0.0], label='$a$')
# ax.plot([x.max() / AU - a, x.max() / AU - a], [0.0, b], label='$b$')

# ax.plot([0.0], [0.0], 'o', label='Sun')
# ax.set(xlabel='$x$ (AU)', ylabel='$y$ (AU)', xlim=[-3, 3], ylim=[-3, 3])
# ax.legend()
# plt.show()         
          


    