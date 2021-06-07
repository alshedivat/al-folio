import numpy as np
from scipy import stats
from numpy.linalg import inv

def likelihood(w, t, PHI, beta):
    if t.shape:
        return np.prod(stats.norm.pdf(t,loc=w.dot(PHI.T), scale=1.0/np.sqrt(beta)), axis=-1)
    else:
        return stats.norm.pdf(t,loc=w.dot(PHI.T), scale=1.0/np.sqrt(beta))
    
def m1_S1(m0, S0, y, beta, PHI):
    if y.shape:
        S1 = inv(inv(S0) + beta*PHI.T@PHI)
        m1 = S1.dot(inv(S0).dot(m0) + beta*PHI.T.dot(y))
    else:
        S1 = inv(inv(S0) + beta*PHI[np.newaxis].T@PHI[np.newaxis])
        m1 = S1.dot(inv(S0).dot(m0) + beta*PHI.T*y)
    return m1, S1

def prior(w, m0, S0):
    return stats.multivariate_normal.pdf(w,mean=m0, cov=S0)